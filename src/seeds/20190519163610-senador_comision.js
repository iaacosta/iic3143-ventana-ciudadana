'use strict';

const data = require('./json/senador_comisiones.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SenatorComitions', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SenatorComitions', null, {});
  },
};
