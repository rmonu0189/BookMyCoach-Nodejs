'use strict';
const app = require('../../index');
const express = require("express");
const requestBody = require('../Validation');
const { validate } = require('express-validation')
const router = express.Router();

// ############ Controllers ##########
const userController = require('../Controller/UserController')

// ######################################
// ############ All Private Routes #######
// ######################################

app.get('/user', userController.getUser)
app.put('/user', validate(requestBody.user.update), userController.updateProfile)

// ######################################
// ############ End Private Routes #######
// ######################################

module.exports = router