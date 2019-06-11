'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assistance = sequelize.define(
    'Assistance',
    {
      lid: DataTypes.INTEGER,
      sid: DataTypes.INTEGER,
      asistencias: DataTypes.INTEGER,
      inasistencias_just: DataTypes.INTEGER,
      inasistencias_no_just: DataTypes.INTEGER,
      fecha_inicio: DataTypes.DATE,
      fecha_fin: DataTypes.DATE,
    },
    {},
  );
  Assistance.associate = function(models) {
    Assistance.belongsTo(models.Senador, {
      foreignKey: 'sid',
    });
  };
  return Assistance;
};
