var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        //db: 'shopping-list',
        db: 'test-list',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        //db: 'shopping-list',
        db: 'test-list',
        port: process.env.PORT || 80

    }
};