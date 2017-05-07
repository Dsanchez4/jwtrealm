'user strict';
const mongojs = require("mongojs");
const config = require("../config/secret");
const db = mongojs(config.DB_PATH, ['token']);

function saveUser(user, callback) {
    db.usuarios.save(user, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

function findUserByUser(user, callback) {
    db.usuarios.findOne({
        usuario: user
    }, function (err, doc) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, doc);
    })
}

function saveIncidece(incidence, callback) {
    db.incidencias.save(incidence, (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        callback(null, data);
    });
}

/*
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

function listUsers(callback) {
    db.token.find(function (err, docs) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, docs);
    });
}
*/


module.exports = {
    saveUser,
    findUserByUser,
    saveIncidece
}