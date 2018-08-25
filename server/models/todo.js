var {mongoose} = require('../DB/mongoose')
var Todo = mongoose.model('todo', {
    text: {
        type:String,
        required:true,
        minlength:1,
        trim: true
    },
    completed:{type:Boolean, default: true},
    completedAt:{type:Number, default:null}
})
module.exports = {
    Todo
}