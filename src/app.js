//here we are require our modules.
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const methodOverride = require('method-override');

//here we are running dotenv.
require('dotenv').config();

//requiring our passport configuration file.
require('./passport/local-auth');

//requiring our db connection.
require('./db');

//here we are initializing some core functionalities of our app.
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares.
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('__method'));
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//global vars:
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//our static files.
app.use(express.static(path.join(__dirname, 'public')));

//here we will import our routes.
app.use('/', require('./routes/routes'));

//initializing our server.
app.listen(app.get('port'), () => {
    console.log(`App listening on port 3000!`);
});
