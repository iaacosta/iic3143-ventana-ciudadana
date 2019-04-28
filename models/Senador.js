module.exports = (sequelize, type) => {
  class Senador extends type.Model {}

  return Senador.init({
    sid: {
      type: type.INTEGER,
      primaryKey: true,
    },
    nombre: {
      type: type.STRING(50),
      allowNull: false,
    },
    apellido_paterno: {
      type: type.STRING(50),
      allowNull: false,
    },
    apellido_materno: {
      type: type.STRING(50),
      allowNull: false,
    },
    partido_politico: type.STRING(50),
    email: type.STRING(50),
    telefono: type.STRING(20),
    curriculum_url: type.STRING(255),
    foto_url: type.STRING(255),
    twitter_url: type.STRING(255),
  }, {
    sequelize,
    modelName: 'senadores',
    timestamps: false,
  })
}
