'use strict';
const auth = require("../auth/auth");
const request = require('ajax-request');
const axios = require('axios');
const moment = require("moment");
const validate = require("../suport/validate");
const strgIndex = require("../storage/index");
const Promise = require("promise");
const geolib = require("../suport/geolib");
const Incidence = require("../suport/incidence");

function ErrorHandler(res, msg) {
    res.send({
        cod: 0,
        msg: msg
    });
}

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
                ErrorHandler(res, "ERROR BD");
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
                    ErrorHandler(res, "ERROR BD");
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
            ErrorHandler(res, "ERROR BD");
            return;
        }
        res.send({
            cod: 1,
            msg: "Incidencia registrada"
        });
    });
}

function login(req, res) {
    var user = req.body.usuario;
    var pwd = req.body.pwd;
    if (!(user && pwd)) {
        res.send({
            cod: 9,
            msg: "Completar datos"
        })
        return
    }
    Promise.all(
        [
            new Promise((rs, rj) => {
                strgIndex.findUserForLogin({
                    user: user,
                    pwd: pwd
                }, (err, data) => {
                    if (err) {
                        rj(err);
                        return
                    }
                    rs(data);
                });
            }),
            new Promise((rs, rj) => {
                strgIndex.findAllIncidence((err, data) => {
                    if (err) {
                        rj(err);
                        return
                    }
                    rs(data);
                });
            })
        ]).then((ress) => {
            if (!ress[0]) {
                res.send({
                    cod: 2,
                    msg: "Usuario no encontrado"
                })
                return
            }
            res.send({
                usuario: ress[0],
                incidencias: ress[1]
            })

        }).catch((errr) => {
            ErrorHandler(res, "ERROR BD");
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

function test(req, res) {
    var pos = { lat: -12.1210146, lon: -76.9932693 }
    strgIndex.findAllIncidence((err, data) => {
        if (err) {
            res.send("error")
            return
        }
        Incidence.getListIncidence(100, pos, data);
        res.send("ok");
    });

}

module.exports = {
    registerUser,
    registerIncidence,
    login,
    test
}