var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./DB/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log("Entered");
    var todo = new Todo(req.body);
    todo.save().then((doc) => {
    res.send(doc)
    }, (e) => {
        res.send(e)
    })
})

app.listen(3000, () => {
    console.log('server is up');
})



