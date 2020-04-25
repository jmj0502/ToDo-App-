//here we are going to setup our mongoose configuration.
const mongoose = require('mongoose');

//connecting to the db.
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Connected to the db!'));

//Setting a little mongoose config that will allow us to user certain methods.
mongoose.set('useFindAndModify', false);

//"mongodb+srv://mainUser:27676046M$@cluster0-77p3o.gcp.mongodb.net/test?retryWrites=true&w=majority"