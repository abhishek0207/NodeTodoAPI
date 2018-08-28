const expect = require('expect')
const request = require('supertest')
const {app} = require('../server.js')
const {Todo} = require('../models/todo.js')
const {ObjectID} = require('mongodb');

const todos = [ {
    _id: new ObjectID(),
    text: 'Seed Data 1'
},
{
    _id: new ObjectID(),
    text: 'Seed Data 2'
},
{
    _id: new ObjectID(),
    text: 'Seed Data 3'
}]
beforeEach((done) => {
    Todo.remove({
    }).then(() =>  
    Todo.insertMany(todos)
   ).then(() => done())
})
describe('POST/todos', () => {
    it('should create a new todo', (done) => {
        var text = 'To do Text';
        request(app)
        .post('/todos').send({text}).expect(200).expect((res) => {
            expect(res.body.text).toBe(text);
        }).end((err, res) => {
            if(err) {
                return done(err)
            } 
            Todo.find().then((todos) => {
                expect(todos.length).toBe(4)
                expect(todos[3].text).toBe(text);
                done();
            }).catch((e) => done(e))
        })
    })

    it('should not create to do with invalid body data', (done) => {
        request(app).post('/todos')
        .send({}).expect(400).end((err, res) => {
            if(err) {
                return done(err);
            } 
            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                done();
            }).catch((e) => done(e))
        })
    })
})

describe('GET /todos', () => {
    it('should get a list of all todos', (done) => {
        request(app)
        .get('/todos').expect(200).expect((res) => {
                expect(res.body.todos.length).toBe(3)
        }).end(done)
    })
})

describe(`GET /todos/:id`, () => {
    it('should return to do properly', (done) => {
        request(app).
        get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200).expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    })
    it('shoudl return a 404 if object id is not found', (done) => {
        request(app).get(`/todos/${new ObjectID().toHexString}`)
        .expect(404).end(done)
    })
    it('shoudl return a 404 if object id is invalid', (done) => {
        request(app).get(`/todos/12sdsad}`)
        .expect(404).end(done)
    })
})

describe('DELETE /todo', () => {
    it('should remove a todo from the list', (done) => {
        var toDelete = todos[0];
        var id = toDelete._id;
        request(app).delete(`/todos/${id.toHexString()}`).expect(200).expect((res) => {
            expect(res.body.todo._id).toBe(id.toHexString());
        }).end((err, res) => {
            if(err) {
                return done(err)
            } else {
                Todo.findById(id.toHexString()).then((value) => {
                    expect(value).toBeFalsy();
                    done();
                }).catch((e) => {
                   done(e);
                })
            }
        })
    })

    it('shoudl return a 404 if object id is not found', (done) => {
        request(app).delete(`/todos/${new ObjectID().toHexString}`)
        .expect(400).end(done)
    })
    it('shoudl return a 404 if object id is invalid', (done) => {
        request(app).delete(`/todos/12sdsad}`)
        .expect(400).end(done)
    })

})