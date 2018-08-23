const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err) {
        console.log('error connecting to MongoDB');
    }
    const db = client.db('TodoApp');

    //findOneandUpdate
    db.collection('Users').findOneAndUpdate({Name: 'Megha'}, {
        '$set' : {
            Name: 'Abhishek'
        },
        '$inc' : {
            Age: 2
        }
    }, {returnOriginal: false}).then((result) => {
        console.log(result);
    }, (error) => console.log(error))
    
})