'use strict';

const data = require('./json/senadores.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Senadors', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Senadors', null, {});
  },
};
