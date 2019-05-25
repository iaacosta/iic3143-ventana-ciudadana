'use strict';

const data = require('./json/proyectos_comision.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProjectComitions', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProjectComitions', null, {});
  },
};
