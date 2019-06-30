'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nombre_completo: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      foto_url: DataTypes.STRING,
    },
    {},
  );

  User.associate = function(models) {
    User.belongsToMany(models.Senador, {
      through: models.UserSenador,
      as: 'Followees',
      foreignKey: 'uid'
    });
  };

  User.authenticate = async (username, password) => {
    const user = await User.findOne({
      attributes: ['id', 'nombre_completo', 'email', 'password'],
      where: { username },
    });
    if (!user) throw new Error('invalidUser');

    const valid = await bcrypt.compare(password, user.get('password'));
    if (valid) return { id: user.get('id'), nombre: user.get('nombre_completo'),
                        email: user.get('email')};
    throw new Error('invalidPassword');
  };

  return User;
};
