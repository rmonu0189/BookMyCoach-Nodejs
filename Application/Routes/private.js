'use strict';
const app = require('../../index');
const express = require("express");
const requestBody = require('../Validation');
const { validate } = require('express-validation');
const router = express.Router();

// ############ Controllers ##########
const userController = require('../Controller/UserController');
const version = '/api/v1'

// ######################################
// ############ All Private Routes #######
// ######################################

app.get(version + '/user', userController.getUser);
app.put(version + '/user', validate(requestBody.user.update), userController.updateProfile);
app.put(version + '/user/sports', userController.updateUserSports);
app.get(version + '/coach/nearby', userController.nearbyCoaches);
app.delete(version + '/user/logout', userController.logout);
app.patch(version + '/user/changePassword', validate(requestBody.user.changePassword), userController.changePassword);

// ######################################
// ############ End Private Routes #######
// ######################################

module.exports = router