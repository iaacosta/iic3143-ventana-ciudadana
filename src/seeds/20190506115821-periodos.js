'use strict';

const data = require('./json/periodos.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('periodos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('periodos', null, {});
  },
};
