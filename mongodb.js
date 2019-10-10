// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'rate-me'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('unable to connect')
    }

    const db=client.db(databaseName)
    
    //short version of above code
     db.collection('users').updateOne({
            _id: new ObjectID("")
        },{
            $inc: {
                age: -1
            }
        }).then((result) => {
            console.log(result)
        }).catch((error) =>{
            console.log(error)
        })
    
    db.collection('tasks').updateMany({
        completed:false
    },{
        $set: {
            completed: true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').deleteMany({
        age:23
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})