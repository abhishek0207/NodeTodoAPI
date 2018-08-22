//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb')
var obj = new ObjectID();
console.log(obj)
MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
if(err) {
    return console.log("unable to connect to mongoDB server")
}
const db = client.db('TodoApp');
console.log("connected to MongoDB server");
// db.collection('Todos').insertOne({
// text: 'Hi this is coming from the mongoDB connect',
// completed: false
// }, (err, res) => {
// if(err) {
//     console.log("unable to insert ToDo" , err);
// } else  {
//     console.log(JSON.stringify(res.ops, undefined, 2))
// }
// })

db.collection('Users').insertOne({
    Name: 'Abhishek',
    Age: 26,
    location: 'united states'
}, (err, res) => {
if(err) {
    console.log("unable to insert the record into users table");
} else {
    JSON.stringify(res.ops, undefined, 2);
    console.log(res);
    console.log(res.ops[0]._id.getTimestamp())
}
})

client.close();
});