'use strict';
const auth = require("../auth/auth");
const request = require('ajax-request');
const axios = require('axios');
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

function getUsertoken(user, callback) {
    strgIndex.getUsertoken(user, (err, users) => {
        if (err) {
            callback();
            return;
        }
        if (!users) {
            callback();
            return;
        }
        callback(null, users);
    });
}

function sendMenssage(req, res) {
    var user = req.body.user;
    getUsertoken(user, (err, data) => {
        /*request.post({
                url: 'https://fcm.googleapis.com/fcm/send',
                data: {
                    "to": data.token,
                    "notification": {
                        "title": "SecurityApp",
                        "body": "Se ingreso una nuevo token 2"
                    },
                    "data": {
                        "titulo": "Este es el titular",
                        "descripcion": "Aquí estará todo el contenido de la noticia"
                    }
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=AIzaSyBQ6j92Mpk_mm6Ykwx_2ojPOp1zl8mFbyE"
                }
            },
            function (err, ress, body) {
                if (err) {
                    return;
                }
                console.log(err);
                console.log(ress);
                console.log(body);
                res.send(body);
            });*/
        axios({
                method: 'post',
                url: 'https://fcm.googleapis.com/fcm/send',
                responseType: 'json',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=AIzaSyBQ6j92Mpk_mm6Ykwx_2ojPOp1zl8mFbyE"
                },
                data: {
                    "to": data.token,
                    "notification": {
                        "title": "SecurityApp",
                        "body": "Se ingreso una nuevo token"
                    },
                    "data": {
                        "titulo": "Este es el titular",
                        "descripcion": "Aquí estará todo el contenido de la noticia"
                    }
                }
            }).then(function (response) {
                console.log("ok");
                res.send(response);
            })
            .catch(function (error) {
                console.log("fail");
                res.send(error);
            });
    });

}

function listUsers(req, res) {
    strgIndex.listUsers((err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(data);
    });
}

module.exports = {
    saveToken,
    sendMenssage,
    listUsers
}