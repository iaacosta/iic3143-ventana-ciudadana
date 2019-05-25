'use strict';
module.exports = (sequelize, DataTypes) => {
  const Senador = sequelize.define(
    'Senador',
    {
      nombre: DataTypes.STRING,
      apellido_paterno: DataTypes.STRING,
      apellido_materno: DataTypes.STRING,
      partido_politico: DataTypes.STRING,
      email: DataTypes.STRING,
      telefono: DataTypes.STRING,
      url_foto: DataTypes.STRING,
      url_twitter: DataTypes.STRING,
      url_curriculum: DataTypes.STRING,
    },
    {},
  );
  Senador.associate = function(models) {
    Senador.belongsToMany(models.Proyecto, {
      through: models.SenadorProyecto,
      foreignKey: 'sid',
    });

    Senador.belongsToMany(models.Comition, {
      through: models.SenatorComition,
      foreignKey: 'sid',
    });

    Senador.hasMany(models.Periodo, { foreignKey: 'sid' });
  };
  return Senador;
};
