'use strict';
const User      = require('../Database/models').User

exports.findByEmail = async (email) => {
    const result = await User.findOne({ where: {email: email}});
    return result;
}

exports.findById = async (userId) => {
    const result = await User.findOne({ where: {id: userId}});
    return result;
}

exports.findByEmailAndPassword = async (email, password) => {
    const result = await User.findOne({ where: {email: email, password: password}});
    return result;
}

exports.create = async (fullName, email, password, userType) => {
    const param = {
        fullName: fullName,
        email: email,
        password: password,
        userType: userType
    };
    const result = await User.create(param);
    return result;
}

exports.update = async (userId, fullName, bio, price, profilePhoto, latitude, longitude) => {
    const param = {
        fullName: fullName,
        bio: bio,
        price: price,
        profilePhoto: profilePhoto,
        latitude: latitude,
        longitude: longitude
    };
    const result = await User.update(param, { where: {id: userId}});
    return result;
}