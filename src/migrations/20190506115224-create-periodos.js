'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Periodos', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Senadors',
          key: 'id',
        },
      },
      cargo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      inicio: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      final: {
        allowNull: false,
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
    return queryInterface.dropTable('Periodos');
  },
};
