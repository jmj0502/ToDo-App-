//first we are oing to import passport, in case we have to use some off it's features!.
const passport = require('passport');
const express = require('express');
const app = express();
require('../passport/local-auth');

//here we are going to write our user controller, since this configuration will allow us to keep our routes cleaner.
const userCtrl = {};

// here we require our user model.
const User = require('../models/users');

//here we are going to start with our basic configuration.
userCtrl.renderRegisterForm = (req, res) => {
    res.render('registerform');
};

//here we are going to add our register form controller.
userCtrl.register = async (req, res) => {
    try {
        let errors = [];
        const data = req.body;
        console.log(data);
        if (!data.username || !data.password || !data.firstName || !data.lastName) {
            errors.push('You must fill every field!');
            res.render('registerform', {
                error: errors
            });
        }
        if (data.password != data.confirmPass) {
           errors.push('Passwords don\'t match!');
           res.render('registerform', {
            error: errors
            });
        }
        if (data.password.length < 4) {
            errors.push('The password should have, at least, four characters.');
            res.render('registerform', {
                error: errors
            });
        }
        const userName = await User.findOne({username: data.username});
        if (userName) {
            errors.push('That username is alredy in use!');
            res.render('registerform', {
                error: errors
            });
        }
        console.log(data.lastName);
            let newUser = await User.create({
                username: data.username,
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName
            });
            console.log(newUser);
            newUser.password = await newUser.encryptPassword(data.password);
            console.log(newUser);
            await newUser.save();
            const users = await User.find();
            console.log(users);
            res.redirect('/api/login');
    } catch (err) {
        console.log(err);
    }
};

//here we are going to create the method that will render our login form.
userCtrl.renderLoginForm = (req, res) => {
    let error_msg = req.flash('error')[0];
    res.locals.error_msg = error_msg;
    res.render('loginform');
};

//here we are going to setup our auth for some routes.
userCtrl.login = passport.authenticate('local',{
    successRedirect: '/api/tasks',
    failureRedirect: '/api/login',
    failureFlash: true
}), (req, res) => {
    console.log(req.body);
};
//here we are going to setup our logout method.
userCtrl.logOut = (req, res) => {
    req.logout();
    res.redirect('/api/login');
};

//here we are going to render our main page.
userCtrl.renderHome = (req, res) => {
    res.render('home');
}

//exporting our controller.
module.exports = userCtrl;