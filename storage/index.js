'user strict';
const mongojs = require("mongojs");
const config = require("../config/secret");
const db = mongojs(config.DB_PATH, ['ulimarket']);

function getUser(callback) {
    console.log(config.DB_PATH);
    db.ulimarket.find({}, function (err, docs) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, docs);
    })
}

module.exports = {
    getUser
}