//here we are going to setup the controller for our tasks.
const taskCtrl = {};

//here we require our task module.
const Task = require('../models/task');

//here we are going to setup the method that will allow the user to create a card!
taskCtrl.createTask = async (req, res) => {
    try {
        const {title, startingDate, deadline, description} = req.body;
        if (!title) {
            req.flash('error_msg', 'You can\'t create a note without a title!');
            res.redirect('/api/tasks');
        }
        if (!deadline) {
            req.flash('error_msg', 'You should set deadline for your task!');
            res.redirect('/api/tasks');
        }
        if (!description) {
            req.flash('error');
            res.redirect('/api/tasks');
        }
        res.locals.message = req.flash();
        let newTask = await Task.create({
            title,
            startingDate,
            deadline,
            description,
            user: req.user
        });
        console.log(newTask);
        req.flash('success_msg', 'Task added to your list!');
        res.redirect('/api/tasks');
    } catch (err) {
        console.log(err);
    }
};


//this method will render every tasks in the user pannel.
taskCtrl.renderTask = async (req, res) => {
    try {
    const task = await Task.find({user: req.user.id});
    res.render('tasks', {
        data: task
    });
    } catch (err) {
        console.log(err);
    }
}

//this method will delete a certain task from the UI.
taskCtrl.deleteTask = async (req, res) => {
    try {
        console.log(req.params.id);
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/api/tasks');
    } catch (err) {
        console.log(err);
    }
};

//this method will allow a certain user to edit its tasks.
taskCtrl.editTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, {title: req.body.title, startingDate: req.body.startingDate, deadline: req.body.deadline, description: req.body.description});
        res.redirect('/api/tasks');        
    } catch (error) {
        console.log(err);
    }
};

taskCtrl.renderEdition = async (req, res) => {
    let task = await Task.findById(req.params.id);
    console.log(task);
    res.render('edit', {
        data: task
    });
};

module.exports = taskCtrl;
