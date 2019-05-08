'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proyectos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      boletin: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fecha: {
        type: Sequelize.DATE,
      },
      resumen: {
        type: Sequelize.TEXT,
      },
      estado: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('Proyectos');
  },
};
