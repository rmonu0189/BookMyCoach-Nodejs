'use strict';

const Joi = require('joi');

exports.register = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
        userType: Joi.string().required()
    }).unknown(true)
}

exports.login = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required()
    }).unknown(true)
}

exports.update = {
    body: Joi.object({
        fullName: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
    }).unknown(true)
}

exports.changePassword = {
    body: Joi.object({
        oldPassword: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required(),
        newPassword: Joi.string().regex(/[a-zA-Z0-9]{6,30}/).required()
    }).unknown(true)
}
