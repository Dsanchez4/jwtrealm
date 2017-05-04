'use strict';
const auth = require("../auth/auth");
const strgIndex = require("../storage/index");


function saveToken(req, res) {
    strgIndex.saveToken((err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(users);
    });
}

function getUsertoken(req, res) {
    strgIndex.getUsertoken((err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(users);
    });
}

module.exports = {
    saveToken,
    getUsertoken
}