'use strict';

const data = require('./json/hitos.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Milestones', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Milestones', null, {});
  },
};
