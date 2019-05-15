'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proyecto = sequelize.define(
    'Proyecto', {
      boletin: DataTypes.STRING,
      fecha: DataTypes.DATE,
      resumen: DataTypes.TEXT,
      estado: DataTypes.STRING,
      url: DataTypes.STRING,
    }, {},
  );
  Proyecto.associate = function (models) {
    Proyecto.belongsToMany(models.Senador, {
      through: models.SenadorProyecto,
      foreignKey: 'pid',
    });
  };
  return Proyecto;
};
