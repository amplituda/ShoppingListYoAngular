var shoppinglist = require('../controllers/shoppinglist');

module.exports = function(app) {
    app.get('/shoppinglist/select', shoppinglist.getList);
    app.post('/shoppinglist/update', shoppinglist.updateList);
    app.post('/shoppinglist/insert', shoppinglist.insertList);
    app.post('/shoppinglist/remove', shoppinglist.removeList);

};