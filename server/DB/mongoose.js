var mongoose = require('mongoose');
mongoose.Promise = global.Promise
let db = {
    localhost: 'mongodb://127.0.0.1:27017/TodoApp',
    mlab: 'mongodb://abhishekahuja02:mickey_123@ds133622.mlab.com:33622/mytodoapp'
}
mongoose.connect(db.mlab);

module.exports = {
    mongoose
}