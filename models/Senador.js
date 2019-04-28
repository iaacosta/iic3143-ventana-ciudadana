module.exports = (sequelize, type) => {
  class Senador extends type.Model {}

  Senador.init({
    id: {
      type: type.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: type.STRING,
      allowNull: false,
    },
    partido_politico: {
      type: type.STRING,
      allowNull: false,
    },
    email: {
      type: type.STRING,
      allowNull: false,
    },
    circunscripcion: {
      type: type.INTEGER,
      allowNull: false,
    },
    region: {
      type: type.STRING,
      allowNull: false,
    },
    photo_uri: {
      type: type.INTEGER,
      allowNull: false,
    },
    telefono: type.STRING,
  }, {
    sequelize,
    modelName: 'senadores'
  });
}
