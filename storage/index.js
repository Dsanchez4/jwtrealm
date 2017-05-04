'user strict';
const mongojs = require("mongojs");
const config = require("../config/secret");
const db = mongojs(config.DB_PATH, ['token']);

function saveToken(callback) {
    db.token.findAndModify({
        query: {
            user: 'mbernedo'
        },
        update: {
            $set: {
                token: 'contraseña'
            }
        },
        new: true
    }, function (err, doc, lastErrorObject) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, doc);
    });
}

function getUsertoken(callback) {
    db.token.findOne({
        user: 'mbernedo'
    },{token : "1"}, function (err, doc) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, doc);
    })
}



module.exports = {
    saveToken,
    getUsertoken
}