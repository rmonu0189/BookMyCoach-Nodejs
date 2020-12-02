'use strict';
const response = require('../Model/Response');
const Booking = require('../Database/models').Booking;

function valueInTwoDigit(value) {
    return `${value < 10 ? '0' : ''}${value}`
}

function getNextDayDate() {
    const date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    return `${valueInTwoDigit(date.getUTCFullYear())}-${valueInTwoDigit(date.getUTCMonth())}-${valueInTwoDigit(date.getUTCDate())}`;
}

exports.sendBookingRequest = async (req, res) => {
    const userId = req.currentUser.id;
    const coachId = req.body.coachId;
    const sessionStartDateTime = `${getNextDayDate()} 07:00 AM`;
    const numberOfSession = 30;
    const result = await Booking.sendBookingRequest(userId, coachId, sessionStartDateTime, numberOfSession);
    return response.success(res, 'Booking request sent success.', result);
}

exports.getCoachPendingBookings = async (req, res) => {
    const coachId = req.currentUser.id;
    const result = await Booking.getCoachPendingBookings(coachId);
    return response.success(res, '', result);
}

exports.getUserPendingBookings = async (req, res) => {
    const userId = req.currentUser.id;
    const result = await Booking.getUserPendingBookings(userId);
    return response.success(res, '', result);
}

exports.acceptPendingBookingByCoach = async (req, res) => {
    const userId = req.currentUser.id;
    const bookingId = req.body.bookingId;
    const findBooking = await Booking.getBookingById(bookingId);
    if(findBooking && findBooking.coachId == userId) {
        await Booking.acceptBooking(bookingId);
        return response.success(res, 'Booking accepted', {});
    } else {
        return response.failed(res, 604);
    }
}

exports.getMyBookings = async (req, res) => {
    const userId = req.currentUser.id;
    const userType = req.currentUser.userType;
    const result = await Booking.getMyBookings(userId, userType);
    return response.success(res, 'My bookings', result);
}