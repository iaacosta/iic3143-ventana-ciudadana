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

  User.associate = function(models) {};
  User.authenticate = async (username, password) => {
    const user = await User.findOne({
      attributes: ['id', 'password'],
      where: { username },
    });
    if (!user) throw new Error('invalidUser');

    const valid = await bcrypt.compare(password, user.get('password'));
    if (valid) return user.get('id');

    throw new Error('invalidPassword');
  };

  return User;
};
