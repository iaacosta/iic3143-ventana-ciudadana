module.exports = (sequelize, type) => (
  sequelize.define('senadores', {
    id: {
      type: type.INTEGER,
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
    url_foto: {
      type: type.STRING,
      allowNull: false,
    },
    telefono: type.STRING,
  })
)
