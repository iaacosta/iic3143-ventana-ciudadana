'use strict';

const data = require('./json/proyectos.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proyectos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proyectos', null, {});
  },
};
