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
// ############ All Public Routes #######
// ######################################

app.post(version + '/user', validate(requestBody.user.register), userController.register);
app.post(version + '/user/login', validate(requestBody.user.login), userController.loginByEmail);

// ######################################
// ############ End Public Routes #######
// ######################################

module.exports = router