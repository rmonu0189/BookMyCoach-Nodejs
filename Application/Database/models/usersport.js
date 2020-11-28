'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSport.belongsTo(models.User, {as: 'user'})
      UserSport.belongsTo(models.Sport, {as: 'sport'})
    }
  };
  UserSport.init({
    userId: DataTypes.INTEGER,
    sportId: DataTypes.INTEGER,
    isPrimary: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserSport',
  });
  return UserSport;
};