const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    heading: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    type: {
        type: String,
    },
    selected:{
        type:Boolean,
        default: false
    },
})

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;