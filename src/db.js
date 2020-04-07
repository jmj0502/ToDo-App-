//here we are going to setup our mongoose configuration.
const mongoose = require('mongoose');

//connecting to the db.
mongoose.connect('mongodb://localhost/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('Connected to the db!'));

//Setting a little mongoose config that will allow us to user certain methods.
mongoose.set('useFindAndModify', false);