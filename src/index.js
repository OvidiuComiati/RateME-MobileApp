const express =  require('express')
require('../db/mongoose')

const userRouter = require('../routers/user')
const ratingRouter = require('../routers/rating')

const app = express()
const port = 3000

const multer = require('multer')
const upload =multer({ //configuring 
    dest:'images'
})

app.post('/upload',upload.single('upload'),(req, res) => {
    res.send()
})

app.use(express.json())//parse to json
app.use(userRouter)
app.use(ratingRouter)


app.listen(port, () => {
    console.log('server up on port : '+port)
})


