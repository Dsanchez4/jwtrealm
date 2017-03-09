var jwt = require('jwt-simple');
var moment = require('moment');
const secret = require("../config/secret");


exports.createToken = function (user) {
    var payload = {
        sub: user.id,
        user: user.user,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix(),
    };
    return jwt.encode(payload, secret.JWT_SECRET);
};