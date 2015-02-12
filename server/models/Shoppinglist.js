(function () {

    var sqlite3 = require('sqlite3').verbose(),
        //db = new sqlite3.Database('shopping-list');
        db = new sqlite3.Database('test-list');

    function find(fn) {

        var sql = "SELECT `i`.*," +
            "`t`.`name` AS `type_name`" +
            "FROM `items` `i`" +
            "JOIN `types` `t`" +
            "ON `t`.`id` = `i`.`type`" +
            "ORDER BY `i`.`date` ASC";

        var sql2 = "SELECT * FROM `types` ORDER BY `id`";

        var output = {},
            error = [];

        this.getAll = function (callback, sql) {
            db.all(sql, function (err, rows) {
                if (err) {
                    callback(err);
                }
                callback(null, rows);
            });
        };

        this.getAll(function (err, rows) {
            if (err !== null) {
                error.push(err);
            }
            output['items'] = rows;
        }, sql);

        this.getAll(function (err, rows) {
            if (err !== null) {
                error.push(err);
            }
            output['types'] = rows;
            fn(err, output);
        }, sql2);
    }

    function update(userData, callback) {
        var sql = "UPDATE `items` SET `done` = ? WHERE `id` = ?";

        db.run(sql, [userData.done, userData.id ], function (err) {
            callback(err);
        });
    }

    function remove(userData, callback) {
        var ids = userData.ids.split('|').join(),
            sql = "DELETE FROM items WHERE id IN (" + ids + ")";

        db.run(sql, function (err) {
            if (err) {
                callback(err);
            }

            find(function (err, collection) {
                callback(err, collection);
                //callback(null, {'message': 'Removed ' + this.changes + ' itmes'});
            });
        });
    }

    function insert(userData, fn) {
        var sql = "INSERT INTO `items` (`id`, `item`, `qty`, `type`) VALUES (null, ?, ?, ?)";

        //Perform INSERT operation.
        db.run(sql, [userData.item, userData.qty, userData.type ], function (err) {
            if (err) {
                fn(err);
            } else {
                _findOne(this.lastID, function (collection) {
                    fn(err, {'error': null, 'item': collection[0]});
                });
            }
        });
    }

    function _findOne(id, callback) {
        var sql = "SELECT `i`.*, `t`.`name` AS `type_name` FROM `items` `i` JOIN `types` `t` ON `t`.`id` = `i`.`type` WHERE `i`.`id` = ?";

        db.all(sql, [id], function (err, rows) {
            if (err) {
                callback(err)
            }
            callback(rows);
        });
    }

    exports.remove = remove;
    exports.insert = insert;
    exports.update = update;
    exports.find = find;

}());