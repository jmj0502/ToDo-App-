# ToDo-App
A little "task manager" I built, in order to practice what I've learned so far until this point.

## Abstract

Ok, the whole thing it's pretty simple, if you want to take a look at the app, you have to either download or clone the repo (I'll try to deploy it as soon as I can, so you can take a look at it live). Once you've done that just run the app.js file with with node or nodemon, and set the following route in your browser:  localhost:3000/api/home.
From that point and on, everything it's pretty intuitive so I bet that you'll find out how the app works in a matter of seconds.

This is actually my first "full-stack" app, and it was built using different JavaScript technologies (Node.js on the Back-End alongside its framework express.js, and other technologies like passport.js, ejs, etc) . I built it in order to practice the concepts I've learned since I started 
my journey to become a Software Developer the last December (2019).

The app is a simple task reminder (somehow similar to a "notes" app), in which every user can add its pending tasks (specifiying its title, its deadline, and its description),
in order to keep track of them. Every task can be modified, and should be deleted once it's acomplished.

This is just the first version of the project, so don't be that rude. I'll probably rebuild the client-side in React (using client-side auth) for future commits, so please stay tunned.

## Brief description of the app:

* /controllers: In the controllers folder, you'll find the functions that handle the user, and task routes through different validation methods, and you'll also find the functions related
with the whole SignUp - SignIn process. This controllers are also, pretty related with the front-end since they handle every rendering process (since the app uses the MVC pattern and server-side rendering).

* /helpers: The helpers folder, contains the isAuthenticated function (passport.js), which is used as a middleware to protect the main routes of the app, in order to avoid the unauthorized access of a given user.

* /models: Here you'll find the mongoose schemas for the user, and for the task models, alonside with some interesting functions. 
For example, the user schema contains different methods provided by bcrypt which allows the app to encrypt and compare, the password of a given user once it has registered/login.

* /passport: In the passport folder, you'll find the passport.js setup file. It contains the configuration of the auth strategy used in the project (local-strategy), which handles the whole loggin process through different validations, and comparisons.

* /public: The simplier thing you'll find in this project. This folder stores the static files used in the project, in this case, an image (the one you can see, once you access the home page).

* /routes: This folder contains a file which handles every route with express.Router. Here we consume our controllers (userController, taskController) and middlewares (isAuthenticated).

* /views: The name of this folder says a lot. What you'll find in here are the views of the project. They were build in ejs, and some inline styles, alongside with bootstrap solved the visual part of them.

* /db.js: This file handles the connection between the app, and the db using Mongoose (mongoDB ORM) as a bridge.

* /app.js: this file is the main server file, and it handles pretty pretty much the whole app. It contains the configuration of many interesting middlewares, libraries and tools (bodyParser, connect-flash, ejs, express, passport, etc).
