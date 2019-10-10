const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const Rating = require('../models/rating')

router.post('/ratings/:id',auth,  async (req, res) => {
    
    const task = new Rating({
        ...req.body, 
        giverUser: req.user._id,
        toUser: req.params.id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }
    catch(error)  {
        res.status(400).send(error)
    }
})

//GET/tasks?limit=10&skip=10 limit results on page and skips the first n instances
//GET /tasks?sortBy=createdAt:desc
router.get('/ratings', auth, async (req,res) => {
    const match = {} 
    const sort = {}
    
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try{
        //const tasks = await Task.find({})
        //const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'ratings',
            options: {
                sort: {
                    createdAt: -1
                }
            }
        }).execPopulate()
        
        req.send(req.user.ratings)
    }
    catch(error)  {
        res.status(500).send()
    }
})

router.get('/ratings/to/:id', auth, async (req,res) => {
    const _id = req.params.id
    try{
        const rating = await Rating.find({toUser:_id, giverUser: req.user._id})
        if(!rating){
            return res.status(404).send()
        }
        res.send(rating)
    }catch(error)  {
        res.status(500).send(error)
    }
})



router.patch('/ratings/:id',auth, async (req, res) => {

    const updates = Object.keys(req.body)// converts from obj to array
    const allowedUpdates = ['rate','comm']
    const isValidOperation = updates.every((item) => { // every runs through the elems of the array, if every value return true then 'every' return true
        return allowedUpdates.includes(item)
    })
    if(!isValidOperation){
       res.status(400).send({error: 'invalid'}) 
    }
    
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators:true})
        const rating = await Rating.findOne({toUser:req.params.id,giverUser: req.user._id})
        if(!rating) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            rating[update] = req.body[update]
        })
        await rating.save()
        res.send(rating)
    }catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/ratings/:id', auth, async (req, res) => {
    try{
        const rating = await Rating.findOneAndDelete({toUser:req.params.id,giverUser:req.user._id})
        if(!rating) {
            return res.status(404).send()
        }
        
        res.send(rating)
    }catch(error) {
        res.status(500).send(error)
    }
})

module.exports = router