//defining our routes.
const router = require('express').Router({
    mergeParams: true
});
require('../passport/local-auth');

//here we are going to import our other modules.
const userCtrl = require('../controllers/userController');
const taskCtrl = require('../controllers/taskController');

//importing our session chequer.
const helper = require('../helpers/helper');

//creating our routes.

//our home page.
router.get('/', userCtrl.renderHome);

//our register routes.
router.get('/api/register', userCtrl.renderRegisterForm);
router.post('/api/register', userCtrl.register);

//our login routes.
router.get('/api/login', userCtrl.renderLoginForm);
router.post('/api/login', passport.authenticate('local',{
    successRedirect: '/api/tasks',
    failureRedirect: '/api/login',
    failureFlash: true
}), userCtrl.login);

//logout route.
router.get('/api/logout', userCtrl.logOut);

//our tasks routes.
router.get('/api/tasks', helper.isLoggedIn, taskCtrl.renderTask);
router.post('/api/tasks', helper.isLoggedIn, taskCtrl.createTask);
router.post('/api/deleteTask/:id', helper.isLoggedIn, taskCtrl.deleteTask);
router.get('/api/updateTask/:id', helper.isLoggedIn, taskCtrl.renderEdition);
router.post('/api/updateTask/:id', helper.isLoggedIn, taskCtrl.editTask);


module.exports = router;

