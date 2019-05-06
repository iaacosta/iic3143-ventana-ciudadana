'use strict';

const data = require('./json/senadores.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('senadors', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('senadors', null, {});
  },
};
