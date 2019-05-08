'use strict';

const data = require('./json/periodos.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Periodos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Periodos', null, {});
  },
};
