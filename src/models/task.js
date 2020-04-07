//here we are going to require mongoose to create our task model.
const { Schema, model } = require('mongoose');
const User = require('./users');

//Building our task model.
const taskSchema = new Schema({ 
    title: String,
    startingDate: String,
    deadline: String,
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//exporting our task model.
module.exports = model('Task', taskSchema);