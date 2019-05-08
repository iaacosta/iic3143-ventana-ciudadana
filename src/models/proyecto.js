'use strict';
module.exports = (sequelize, DataTypes) => {
  const proyecto = sequelize.define(
    'proyecto',
    {
      boletin: DataTypes.STRING,
      fecha: DataTypes.DATE,
      resumen: DataTypes.TEXT,
      estado: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {},
  );
  proyecto.associate = function(models) {
    // associations can be defined here
  };
  return proyecto;
};
