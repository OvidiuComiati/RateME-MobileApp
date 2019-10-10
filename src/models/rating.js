const mongoose = require('mongoose')
const validator = require('validator')

const ratingSchema = new mongoose.Schema({
    rate: {
        type: Number,
        default: 1,
        validate(value) { 
            if(Number.isInteger(value) === false || value<0 || value>5 ){
                throw new Error('not a valid rating')
            }
        }
    },
    giverUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comm: {
        type: String,
        trim: true
    }
},{
    timestamps: true
})

const Rating = mongoose.model('Rating',ratingSchema)

module.exports = Rating