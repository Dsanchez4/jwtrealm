'use strict';
const auth = require("../auth/auth");
const request = require('ajax-request');
const axios = require('axios');
const moment = require("moment");
const validate = require("../suport/validate");
const strgIndex = require("../storage/index");
const geolib = require("geolib");

function registerUser(req, res) {
    if (!validate.regUser(req.body)) {
        res.send({
            cod: 9,
            msg: "Completar datos"
        });
        return;
    }
    strgIndex.findUserByUser(req.body.usuario,
        (err, data) => {
            if (err) {
                res.send({
                    cod: 0,
                    msg: "Error bd"
                });
                return;
            }
            if (data) {
                res.send({
                    cod: 9,
                    msg: "Usuario ya registrado"
                });
                return;
            }
            strgIndex.saveUser(req.body, (err, data) => {
                if (err) {
                    console.log(err);
                    res.send("mal");
                    return;
                }
                console.log(data);
                res.send("correcto");
            });

        });
}

function registerIncidence(req, res) {
    var incidence = req.body;
    if (!validate.regIncidence(req.body)) {
        res.send({
            cod: 9,
            msg: "Completar datos"
        });
        return;
    }
    var hoy = moment().format('DD-MM-YYYY hh:mm:ss');
    console.log(hoy);
    incidence.fecha = hoy;
    incidence.estado = 0;
    incidence.revisado = 0;
    strgIndex.saveIncidece(incidence, (err, data) => {
        if (err) {
            res.send({
                cod: 0,
                msg: "Error BD"
            });
            return;
        }
        res.send({
            cod: 1,
            msg: "Incidencia registrada"
        });
    });
}

function test() {
    return geolib.getDistanceSimple({
        latitude: -12.093636,
        longitude: -76.982162
    }, {
        latitude: -12.094412,
        longitude: -76.981277
    });
}

/*
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
                        "title": req.body.titulo,
                        "body": req.body.cuerpo
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
*/

module.exports = {
    registerUser,
    registerIncidence
}