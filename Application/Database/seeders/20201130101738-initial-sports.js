'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sports', [{
      id: 1,
      name: 'Basketball',
      icon: 'basketball'
    },
    {
      id: 2,
      name: 'Cricket',
      icon: 'cricket'
    },
    {
      id: 3,
      name: 'Badminton',
      icon: 'badminton'
    },
    {
      id: 4,
      name: 'Football',
      icon: 'football'
    },
    {
      id: 5,
      name: 'Handball',
      icon: 'handball'
    },
    {
      id: 6,
      name: 'Hockey',
      icon: 'hockey'
    },
    {
      id: 7,
      name: 'Rugby',
      icon: 'rugby'
    },
    {
      id: 8,
      name: 'Swimming',
      icon: 'swimming'
    },
    {
      id: 9,
      name: 'Tennis',
      icon: 'tennis'
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sports', null, {});
  }
};
