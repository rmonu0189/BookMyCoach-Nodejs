'use strict';
const messages = require('../Constant/StatusCode');

exports.success = (res, message, data) => {
    res.setHeader("Content-Type", "application/json");
    res.send({status: true, message: message, data: data})
}

exports.failed = (res, statusCode, message) => {
    res.setHeader("Content-Type", "application/json");
    res.status(statusCode).send({status: false, message: message ? message : messages.codes[statusCode], data: {}})
}