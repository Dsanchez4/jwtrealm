'user strict';
const geolib = require("./geolib");

function getListIncidence(rango, pos, allInc, notiInc) {

    for (var i = 0; i < allInc.length; i++) {
        var position = allInc[i].pos;
        var dis = geolib.getDistanceGeoLib(pos, position);

        console.log("Distancia : " + dis);
    }
}

module.exports = {
    getListIncidence
}