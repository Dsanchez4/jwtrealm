'user strict';
const mongojs = require("mongojs");
const config = require("../config/secret");
const db = mongojs(config.DB_PATH, ['token']);

function saveToken(data, callback) {
    db.token.findAndModify({
        query: {
            user: data.user
        },
        update: {
            $set: {
                token: data.token
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

function getUsertoken(user, callback) {
    db.token.findOne({
        user: user
    }, {
        token: "1"
    }, function (err, doc) {
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