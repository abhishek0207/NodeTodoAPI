require('./config/config.js')
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var {mongoose} = require('./DB/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongoDB')
const port = process.env.PORT;
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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    //validate the id
    if(!ObjectID.isValid(id)) {
        res.status(400).send();

    }
    else {
        Todo.findByIdAndRemove(id).then((todo)=> {
            if(!todo) {
                res.status(400).send({
                    message: 'No record found'
                })
            } else {
                res.status(200).send({todo});
            }
        }).catch((e) => {
            res.status(400).send(e);
        })
    }
   
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    console.log(id);
    if(!ObjectID.isValid(id)) {
        res.status(400).send({message: 'invalid id'});

    }
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    console.log(body.text);
    console.log(body.completed);
    Todo.findByIdAndUpdate(id, {$set: body},
        {new: true }).then((todo) => {
        if(!todo) {
           return res.status(404).send({message: 'no todo with a given id is found'})
        } else {
            return res.status(200).send({todo});
        }
    }).catch((e) => {
    return res.status(404).send({someError: e})
    });
})

app.listen(port, () => {
    console.log(`server is up at ${port}`);
})


module.exports = {
    app
}