var sqlite3 = require('sqlite3').verbose(),
    path = require('path');

/*
 check if db already exists
 if not initialize tables

 SELECT name FROM sqlite_master WHERE type='table' AND name='table_name';
 */

module.exports = function (config) {
    path.exists(config.db, function (exists) {
        if (exists) {
            //console.log('file exist');

        } else {
            initdb(config);
        }
    });
};

/*
 INSERT INTO types (id, name) VALUES (null, 'Qty'), (null, 'Kg');
 INSERT INTO items (id, item, qty, type) VALUES (null, 'Butter', 1, 1);
*/
function initdb(config) {
    var db = new sqlite3.Database(config.db);
    var check;

    db.serialize(function () {
        db.run("CREATE TABLE if not exists items (id INTEGER PRIMARY KEY AUTOINCREMENT, item VARCHAR(50), qty NUMERIC, type INTEGER, done INTEGER DEFAULT 0, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
        db.run("CREATE TABLE if not exists types (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))");

        var types = [];
        types.push({'name': 'Qty'});
        types.push({'name': 'Kg'});

        var stmt = db.prepare("INSERT INTO types (id, name) VALUES (null, ?)");

        for (var i = 0; i < types.length; i++) {
            stmt.run(types[i].name);
        }

        stmt.finalize();
    });

    db.close();
}