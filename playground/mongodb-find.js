const {MongoClient} = require('mongoDB');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
if(err) {
    console.log("unable to connect to mongodb");
} else {
    console.log("connected to Mongo on port 27017");
    const db  = client.db('TodoApp');
    db.collection('Users').find({Name: 'Abhishek', Age: 26}).toArray().then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
    }, (err) => {
        console.log("there is some error in fetching the data");
    })
}

client.close();
})

