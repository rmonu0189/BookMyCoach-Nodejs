'use strict';
const response = require('../Model/Response');
const user = require('../Model/User');
const SHA512 = require('js-sha512')
const accessToken = require('../Model/AccessToken');
const { use } = require('../Routes/public');

exports.getUser = (req, res) => {
    const user = req.currentUser;
    user.password = undefined;
    return response.success(res, "", user);
}

exports.loginByEmail = async (req, res) => {
    const email = req.body.email;
    const password = SHA512(req.body.password);
    let existing = await user.findByEmailAndPassword(email, password);
    if(existing) {
        existing.password = undefined;
        const token = await accessToken.generate(existing.id, "API", "")
        res.setHeader("token", token);
        response.success(res, "", existing);
    } else {
        response.failed(res, 602);
    }
}

exports.register = async (req, res) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = SHA512(req.body.password);
    const userType = req.body.userType;

    const existing = await user.findByEmail(email);
    if (existing) {
        return response.failed(res, 600)
    } else {
        await user.create(fullName, email, password, userType);
        return this.loginByEmail(req, res);
    }
}

exports.updateProfile = async (req, res) => {
    const userId = req.currentUser.id;
    const fullName = req.body.fullName;
    const bio = req.body.bio || null;
    const price = req.body.price || null;
    const latitude = req.body.latitude || null;
    const longitude = req.body.longitude || null;
    const profilePhoto = req.body.profilePhoto || null;
    await user.update(userId, fullName, bio, price, profilePhoto, latitude, longitude);
    return response.success(res, 'User updated successfully', {});
}

exports.nearbyCoaches = async (req, res) => {
    const latitude = req.body.latitude || 0;
    const longitude = req.body.longitude || 0;
    const users = await user.nearbyCoaches(latitude, longitude);
    return response.success(res, '', users);
}