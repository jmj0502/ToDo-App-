//here we are importing what we need to create our user model, and to hash it's password.
const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const Task = require('./task');

//creating our user model.
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

//here we are going to define the encryption methods for oue schema.

//this method encrypts every password.
userSchema.methods.encryptPassword = async function(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.log(err);
    };
};


//this method compares the original user password with the provided one.
userSchema.methods.validatePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        console.log(err);
    };
};

//here we export our module.
module.exports = model('User', userSchema);