const {mongoose} = require('mongoose');
const {User} = require('../server/models/user');

User.find({}).then((users) => {
    console.log(users);
}, (e) => {
    console.log(e);
} )

console.log("user for the given object id is");

User.findById('5b7f67e72e3be1234462b250').then((user) => {
    if(!user) {
        console.log("user not found for the supplied id");
    } else {
        console.log(user)
    }
}, (e) => console.log(e))