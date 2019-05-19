'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comition = sequelize.define(
    'Comition',
    {
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      telefono: DataTypes.STRING,
    },
    {},
  );
  Comition.associate = function(models) {
    Comition.belongsToMany(models.Senador, {
      through: models.SenatorComition,
      foreignKey: 'cid',
    });

    Comition.belongsToMany(models.Proyecto, {
      through: models.ProjectComition,
      foreignKey: 'cid',
    });
  };
  return Comition;
};
