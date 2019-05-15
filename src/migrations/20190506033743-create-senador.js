'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Senadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      apellido_paterno: {
        type: Sequelize.STRING,
      },
      apellido_materno: {
        type: Sequelize.STRING,
      },
      partido_politico: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      telefono: {
        type: Sequelize.STRING,
      },
      url_foto: {
        type: Sequelize.STRING,
      },
      url_twitter: {
        type: Sequelize.STRING,
      },
      url_curriculum: {
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
    return queryInterface.dropTable('Senadors');
  },
};
