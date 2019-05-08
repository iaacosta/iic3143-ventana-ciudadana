'use strict';

const data = require('./json/senador_proyecto.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SenadorProyectos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SenadorProyectos', null, {});
  },
};
