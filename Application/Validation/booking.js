'use strict';

const Joi = require('joi');

exports.bookingRequest = {
    body: Joi.object({
        coachId: Joi.number().required()
    }).unknown(true)
}

exports.acceptBooking = {
    body: Joi.object({
        bookingId: Joi.number().required(),
        isAccepted: Joi.boolean().required()
    }).unknown(true)
}
