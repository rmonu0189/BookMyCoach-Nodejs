'use strict';
const app = require('../../index');
const express = require("express");
const requestBody = require('../Validation');
const { validate } = require('express-validation');
const router = express.Router();

// ############ Controllers ##########
const userController = require('../Controller/UserController');
const bookingController = require('../Controller/BookingController');
const version = '/api/v1'

// ######################################
// ############ All Private Routes #######
// ######################################

// User's Route
app.get(version + '/user', userController.getUser);
app.put(version + '/user', validate(requestBody.user.update), userController.updateProfile);
app.put(version + '/user/sports', userController.updateUserSports);
app.get(version + '/coach/nearby', userController.nearbyCoaches);
app.delete(version + '/user/logout', userController.logout);
app.patch(version + '/user/changePassword', validate(requestBody.user.changePassword), userController.changePassword);

// Booking Routes
app.post(version + '/booking/request', validate(requestBody.booking.bookingRequest), bookingController.sendBookingRequest);
app.get(version + '/coach/booking/pending', bookingController.getCoachPendingBookings);
app.get(version + '/user/booking/pending', bookingController.getUserPendingBookings);
app.patch(version + '/coach/booking/accept', validate(requestBody.booking.acceptBooking), bookingController.acceptPendingBookingByCoach);

// ######################################
// ############ End Private Routes #######
// ######################################s

module.exports = router