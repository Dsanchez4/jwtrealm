'use strict';
const auth = require("../auth/auth");
const strgIndex = require("../storage/index");


function login(req, res) {
    let user = req.body.user;
    let pdw = req.body.pwd;
    let jwt = auth.createToken({
        id: "123",
        user: user
    });
    res.send({
        jwt: jwt
    });
}

function authRoute(req, res) {
    res.send({
        jwt: req.user
    })
}

function getUsers(req, res) {
    strgIndex.getUser((err, users) => {
        if (err) {
            res.send(err);
            return;
        }
        res.send(users);
    });
}

module.exports = {
    login,
    authRoute,
    getUsers
}