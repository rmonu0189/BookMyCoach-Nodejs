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
app.get(version + '/coach/nearby', userController.nearbyCoaches);

// ######################################
// ############ End Private Routes #######
// ######################################

module.exports = router