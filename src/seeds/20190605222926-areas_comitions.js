'use strict';

const data = require('./json/areas_comitions.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('AreaComitions', data, {});
},

down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('AreaComitions', null, {});
},
};
