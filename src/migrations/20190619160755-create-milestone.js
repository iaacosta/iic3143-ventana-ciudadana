'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Milestones', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pid: {
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATE,
      },
      a_favor: {
        type: Sequelize.INTEGER,
      },
      en_contra: {
        type: Sequelize.INTEGER,
      },
      abstencion: {
        type: Sequelize.INTEGER,
      },
      pareo: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Milestones');
  },
};
