'user strict';
const geolib = require("geolib");

function getDistanceGeoLib(pos1, pos2) {
    return geolib.getDistanceSimple({
        latitude: pos1.lat,
        longitude: pos1.lon
    }, {
            latitude: pos2.lat,
            longitude: pos2.lon
        });
}

module.exports = {
    getDistanceGeoLib
}
