'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      mobile: {
        allowNull: true,
        type: Sequelize.STRING(20)
      },
      password: {
        type: Sequelize.STRING(512)
      },
      profilePhoto: {
        allowNull: true,
        type: Sequelize.STRING(255)
      },
      userType: {
        type: Sequelize.ENUM('player', 'coach'),
        defaultValue: 'player'
      },
      bio: {
        allowNull: true,
        type: Sequelize.STRING(2048)
      },
      price: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      rating: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      latitude: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      longitude: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};