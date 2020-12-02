'use strict';
const {
  Model
} = require('sequelize');
const { booking } = require('../../Validation');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static async getBookingById(bookingId) {
      const result = await Booking.findOne({where: {id: bookingId}});
      return result;
    }

    static async getMyBookings(userId, userType) {
      const model = require('./index');
      if(userType === 'player') {
        const result = await Booking.findAll({
          where: {userId: userId},
          include: [
            {model: model.User, as: 'coach', attributes: ['id', 'email', 'fullName', 'profilePhoto', 'userType'],
            include: {
              model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
              include: {model: model.Sport, as: 'sport'},
          }
        }
          ]
        });
        return result;
      } else {
        const result = await Booking.findAll({
          where: {coachId: userId},
          include: [
            {model: model.User, as: 'user', attributes: ['id', 'email','fullName', 'profilePhoto', 'userType'],
            include: {
              model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
              include: {model: model.Sport, as: 'sport'},
          }
          },
          ]
        });
        return result;
      }
    }

    static async getCoachPendingBookings(coachId) {
      const model = require('./index');
      const result = await Booking.findAll({
        where: {coachId: coachId, status: 'pending'},
        include: [
          {
            model: model.User, as: 'user', attributes: ['id', 'email', 'fullName', 'profilePhoto', 'userType'],
            include: {
              model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
              include: {model: model.Sport, as: 'sport'},
          }
          },
          {
            model: model.User, as: 'coach', attributes: ['id', 'email', 'fullName', 'profilePhoto', 'userType'],
            include: {
              model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
              include: {model: model.Sport, as: 'sport'},
          }
          }
        ]
      })
      return result;
    }

    static async getUserPendingBookings(userId) {
      const model = require('./index');
      const result = await Booking.findAll({
        where: {userId: userId, status: 'pending'},
        include: [
          {model: model.User, as: 'user', attributes: ['id', 'email', 'fullName', 'profilePhoto', 'userType'], 
          include: {
            model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
            include: {model: model.Sport, as: 'sport'},
        }},
          {model: model.User, as: 'coach', attributes: ['id', 'email', 'fullName', 'profilePhoto', 'userType'], 
          include: {
            model: model.UserSport, as: 'userSports', attributes: ['id', 'sportId'],
            include: {model: model.Sport, as: 'sport'},
        }}
        ]
      })
      return result;
    }

    static async sendBookingRequest(userId, coachId, sessionStartDateTime, numberOfSession) {
      const params = {
        userId: userId,
        coachId: coachId,
        sessionStartDateTime: sessionStartDateTime,
        numberOfSession: numberOfSession,
        status: 'pending'
      }
      const result = await Booking.create(params);
      return result;
    }

    static async acceptBooking(bookingId) {
      const params = {
        responseDate: new Date(),
        paymentDate: new Date(),
        status: 'active'
      }
      await Booking.update(params, { where: {id: bookingId}})
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {as: 'user'})
      Booking.belongsTo(models.User, {as: 'coach'})
    }
  };
  Booking.init({
    userId: DataTypes.INTEGER,
    coachId: DataTypes.INTEGER,
    responseDate: DataTypes.DATE,
    paymentDate: DataTypes.DATE,
    status: DataTypes.ENUM('pending', 'accepted', 'rejected', 'active', 'expired'),
    sessionStartDateTime: DataTypes.DATE,
    numberOfSession: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};