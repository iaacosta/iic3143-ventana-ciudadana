'use strict';

const data = require('./json/areas.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert('Areas', data, {});
},

down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('Areas', null, {});
},
};
