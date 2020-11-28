'use strict';
const accessToken = require('../Model/AccessToken');
const user =        require('../Model/User');
const response =    require('../Model/Response');

module.exports = function () {
    return async function (req, res, next) {
        var token = req.headers.token
        if(token) {
            const result = await accessToken.verify(token)
            if(result) {
                const existingUser = await user.findById(result.userId)
                if(existingUser) {
                    req.currentUser = existingUser
                    next()
                } else {
                    return response.failed(res, 401, "Your access token has been expired.")
                }
            } else {
                return response.failed(res, 401)
            }
        } else {
            return response.failed(res, 401, "Token can not be empty.")
        }
    }
}