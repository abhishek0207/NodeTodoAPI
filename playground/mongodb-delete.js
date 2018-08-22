const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err) {
        console.log('error connecting to MongoDB');
    }
    const db = client.db('TodoApp');
    //deleteMany
    // db.collection('Users').deleteMany({Name: 'Abhishek'}).then((result) => {
    //     console.log(result);
    // }, (error) => {
    //     console.log(error);
    // })

    //deleteOne

    //findOneanddelete
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b7ca05d4ebb0020b46f9bc4")}).then((result) => {
        console.log(result);
    }, (error) => console.log(error))

    
})