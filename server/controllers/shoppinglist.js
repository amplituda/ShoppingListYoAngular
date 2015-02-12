var Shoppinglist = require('../models/Shoppinglist');

exports.getList = function(req, res) {
    Shoppinglist.find(function(err, collection) {
        res.send(collection);
    })
};

exports.insertList = function(req, res) {
    var userData = req.body;

    Shoppinglist.insert(userData, function(err, collection){
        if(err){
            res.send({message: err});
        }
        res.send(collection);
    });
};

exports.updateList = function(req, res) {
    var userData = req.body;

    Shoppinglist.update(userData, function(err){
        if(err){
            res.send({message: err});
        }
        res.send({message: 'ok'});
    });
};

exports.removeList = function(req, res) {
    var userData = req.body;

    Shoppinglist.remove(userData, function(err){
        if(err){
            res.send({message: err});
        }
        res.send({message: 'ok'});
    });
};