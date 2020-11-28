'use strict';
const response =    require('../Model/Response');

module.exports = function () {
    return async function (req, res, next) {
        var key = req.headers.apikey
        if(key && key == process.env.API_KEY) {
            next();
        } else {
            return response.failed(res, 403)
        }
    }
}