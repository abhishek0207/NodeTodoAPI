var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./DB/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const port = process.env.PORT || 3000; 
var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log("Entered");
    var todo = new Todo(req.body);
    todo.save().then((doc) => {
    res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res)=>{
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send({message: 'id npt found'})
        } else {
            res.send({todo})
        }
    }, (e) => {
        res.status(404).send(e);
    })
})

app.listen(port, () => {
    console.log(`server is up at ${port}`);
})


module.exports = {
    app
}