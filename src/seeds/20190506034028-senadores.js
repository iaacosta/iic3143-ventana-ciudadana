'use strict';

const data = require('./json/senadores.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('senadores', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('senadores', null, {});
  },
};
