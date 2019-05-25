'use strict';
module.exports = (sequelize, DataTypes) => {
  const Periodos = sequelize.define('Periodo', {
    sid: DataTypes.INTEGER,
    cargo: DataTypes.STRING,
    inicio: DataTypes.INTEGER,
    final: DataTypes.INTEGER,
  });
  Periodos.associate = function (models) {
    Periodos.belongsTo(models.Senador, {
      foreignKey: 'sid'
    });
  };
  return Periodos;
};
