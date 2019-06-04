'use strict';

const data = require('./json/asistencias.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Assistance', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Assistance', null, {});
  },
};
