var shoppinglist = require('../controllers/shoppinglist');
//  auth = require('./auth'),
//  users = require('../controllers/users'),
//  courses = require('../controllers/courses'),
//  mongoose = require('mongoose'),
//  User = mongoose.model('User');

module.exports = function(app) {

    app.get('/shoppinglist/select', shoppinglist.getList);
    app.post('/shoppinglist/update', shoppinglist.updateList);
    app.post('/shoppinglist/insert', shoppinglist.insertList);
    app.post('/shoppinglist/remove', shoppinglist.removeList);

//    app.get('/shoppinglist/select', function(req, res) {
//        return res.status(200).send({
//            message: 'You are not authorized'
//        });
//      });


//  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
//  app.post('/api/users', users.createUser);
//  app.put('/api/users', users.updateUser);
//
//  app.get('/api/courses', courses.getCourses);
//  app.get('/api/courses/:id', courses.getCourseById);
//
//  app.get('/partials/*', function(req, res) {
//    res.render('../../public/app/' + req.params[0]);
//  });
//
//  app.post('/login', auth.authenticate);
//
//  app.post('/logout', function(req, res) {
//    req.logout();
//    res.end();
//  });
//
//  app.all('/api/*', function(req, res) {
//    res.send(404);
//  });
//
//  app.get('*', function(req, res) {
//    res.render('index', {
//      bootstrappedUser: req.user
//    });

    //app.get('*', function(req, res) {
        //console.log('ok');
        //res.send(200);

  //  });


}