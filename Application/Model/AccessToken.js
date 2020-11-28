'use strict';
const database = require('../Database/models');
const randomstring = require('randomstring')

exports.generate = async (userId, type, payload) => {
    var token = randomstring.generate({
                    length: 128,
                    charset: 'alphanumeric'
                });
    token = token + "-" + Date.now()
    await database.AccessToken.create({userId: userId, token: token, type: type, payload: payload})
    return token
}

exports.verify = async (token) => {
    var accessToken = await database.AccessToken.findOne({where: {token: token}})
    return accessToken
}

exports.destroy = (token) => {
    database.AccessToken.destroy({where: {token: token}})
}
