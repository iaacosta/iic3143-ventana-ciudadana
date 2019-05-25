'use strict';

const data = require('./json/comisiones.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comitions', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comitions', null, {});
  },
};
