var {mongoose} = require('../DB/mongoose')

var User = mongoose.model('user', {
    email: {
        type:String,
        required:true,
        trim:true,
        minlength: 1
    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength: 8
    }
})

module.exports = {
    User
}