'use strict';
const auth = require("../auth/auth");
const request = require('ajax-request');
const strgIndex = require("../storage/index");


function saveToken(req, res) {
    var user = req.body.user;
    var token = req.body.token;

    strgIndex.saveToken({
        user: user,
        token: token
    }, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!users) {
            res.send({
                cod: 0,
                msg: "Usuario no registrado"
            });
            return;
        }
        res.send({
            cod: 1,
            msg: "Actualizaco con éxito"
        });
    });
}

function getUsertoken(req, res) {
    var user = req.body.user;
    strgIndex.getUsertoken(user, (err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        if (!users) {
            res.send({
                cod: 0,
                msg: "Usuario no registrado"
            });
            return;
        }
        res.send({
            cod: 1,
            data: users
        });
    });
}

function sendMenssage() {
    request.post({
        url: 'https://fcm.googleapis.com/fcm/send',
        data: {},
        headers: {}
    });
}

module.exports = {
    saveToken,
    getUsertoken
}