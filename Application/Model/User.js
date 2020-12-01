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
    const result = await User.findOne({ 
        where: {id: userId},
        include: {
            model: UserSport, as: 'userSports', attributes: ['id', 'sportId'],
            include: {model: Sport, as: 'sport'},
        },
        attributes: ['id', 'fullName', 'email', 'mobile', 'profilePhoto', 'userType', 'bio', 'price', 'rating', 'latitude', 'longitude', 'isProfileComplete']
    });
    return result;
}

exports.findByEmailAndPassword = async (email, password) => {
    const result = await User.findOne({ 
        where: {email: email, password: password},
        include: {
            model: UserSport, as: 'userSports', attributes: ['id', 'sportId'],
            include: {model: Sport, as: 'sport'},
        },
        attributes: ['id', 'fullName', 'email', 'mobile', 'profilePhoto', 'userType', 'bio', 'price', 'rating', 'latitude', 'longitude', 'isProfileComplete']
    });
    return result;
}

exports.create = async (email, password, userType) => {
    const param = {
        fullName: "",
        email: email,
        password: password,
        userType: userType
    };
    const result = await User.create(param);
    return result;
}

exports.update = async (userId, fullName, bio, price, profilePhoto, latitude, longitude, isProfileComplete) => {
    const param = {
        fullName: fullName,
        bio: bio,
        price: price,
        profilePhoto: profilePhoto,
        latitude: latitude,
        longitude: longitude,
        isProfileComplete: isProfileComplete
    };
    await User.update(param, { where: {id: userId}});
    const updateUser = await this.findById(userId);
    return updateUser;
}

exports.nearbyCoaches = async (latitude, longitude) => {
    const users = await User.findAll({
        attributes: [
            'id', 'fullName', 'email', 'mobile', 'profilePhoto', 'userType', 'bio', 'price', 'rating', 'latitude', 'longitude',
            [sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(latitude)) * cos(radians("+longitude+") - radians(longitude)) + sin(radians("+latitude+")) * sin(radians(latitude)))"),'distance']
        ],
        include: {
            model: UserSport, 
            as: 'userSports',
            include: {model: Sport, as: 'sport'}
        },
        where: {userType: 'coach', isProfileComplete: true},
        order: sequelize.col('distance'),
        limit: 20
    });
    return users;
}

exports.updateUserSports = async (userId, sports) => {
    let newSports = [];
    sports.forEach(sport => {
        newSports.push({
            userId: userId,
            sportId: sport.sportId,
            isPrimary: sport.isPrimary
        });
    });
    await UserSport.destroy({where: {userId: userId}});
    let result = await UserSport.bulkCreate(newSports);
    await User.update({isProfileComplete: true}, { where: {id: userId}});
    return result;
}

exports.updatePassword = async (userId, password) => {
    await User.update({password: password}, { where: {id: userId}});
    return true;
}
