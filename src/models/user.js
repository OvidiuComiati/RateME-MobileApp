const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Rating = require('../models/rating')
const moment = require('moment')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //unique: true,
        require: true,
        trim: true
    },
    bio: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('email not good')
            }
        }
    },
    dateOfBirth: {
        type: String,
        default: '01-01-1970',
        validate(value) { 
            if(!moment(value, "DD-MM-YYYY").isValid()){
                throw new Error('date not found')
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        trim: true,
        validate (value) {
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain password')
            }
        }
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('ratings', {
    ref:'Rating',
    localField: '_id',
    foreignField: 'giverUser'
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('no user')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('password wrong')
    }
    return user
}

//
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() },'secret',{expiresIn: '1 hour'})

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () { 
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password

    return userObject
}
//hash the plain text before save
userSchema.pre('save', async function (next)  {
    const user = this 

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})
//delete user rating when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Rating.deleteMany({giverUser: user._id})
    next()
})

const User = mongoose.model ('User',userSchema)

module.exports=User