'use strict';

const data = require('./json/senador_proyecto.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('senador_proyectos', data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('senador_proyectos', null, {});
  },
};
