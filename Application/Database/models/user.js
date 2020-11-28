'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.UserSport, {as: 'sports', foreignKey: 'userId'})
    }
  };
  User.init({
    fullName: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    mobile: DataTypes.STRING(20),
    password: DataTypes.STRING(512),
    profilePhoto: DataTypes.STRING(255),
    userType: DataTypes.ENUM('player', 'coach'),
    bio: DataTypes.STRING(2048),
    price: DataTypes.DOUBLE,
    rating: DataTypes.DOUBLE,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};