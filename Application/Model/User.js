'use strict';
const User      = require('../Database/models').User;
const UserSport     = require('../Database/models').UserSport;
const Sport     = require('../Database/models').Sport;
const { array } = require('joi');
const sequelize = require('sequelize');

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
        longitude: longitude,
        isProfileComplete: true
    };
    await User.update(param, { where: {id: userId}});
    const updateUser = await User.findById(userId);
    return updateUser;
}

exports.nearbyCoaches = async (latitude, longitude) => {
    const users = await User.findAll({
        attributes: [
            'id', 'email', 'mobile', 'profilePhoto', 'userType', 'bio', 'price', 'rating', 'latitude', 'longitude',
            [sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(latitude)) * cos(radians("+longitude+") - radians(longitude)) + sin(radians("+latitude+")) * sin(radians(latitude)))"),'distance']
        ],
        include: {
            model: UserSport, 
            as: 'userSports',
            include: {model: Sport, as: 'sport'}
        },
        where: {userType: 'coach'},
        order: sequelize.col('distance'),
        limit: 20
    });
    return users;
}
