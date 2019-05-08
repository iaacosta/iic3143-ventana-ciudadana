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
    proyecto.belongsToMany(models.senador, {
      through: models.senador_proyecto,
      foreignKey: 'pid',
    });
  };
  return proyecto;
};
