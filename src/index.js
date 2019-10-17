const express =  require('express')
require('../db/mongoose')

const userRouter = require('../routers/user')
const ratingRouter = require('../routers/rating')

const app = express()
const port = 3000


app.use(express.json())//parse to json
app.use(userRouter)
app.use(ratingRouter)


app.listen(port, () => {
    console.log('server up on port : '+port)
})


