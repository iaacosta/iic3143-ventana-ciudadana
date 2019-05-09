'use strict';

const data = require('./json/proyectos.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Proyectos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Proyectos', null, {});
  },
};
