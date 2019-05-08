'use strict';
module.exports = (sequelize, DataTypes) => {
  const senador = sequelize.define(
    'senador',
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
  senador.associate = function(models) {
    senador.belongsToMany(models.proyecto, {
      through: models.senador_proyecto,
      foreignKey: 'sid',
    });
  };
  return senador;
};
