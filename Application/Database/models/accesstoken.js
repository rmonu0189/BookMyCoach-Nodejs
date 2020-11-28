'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AccessToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING(255),
    type: DataTypes.STRING(20),
    payload: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'AccessToken',
  });
  return AccessToken;
};