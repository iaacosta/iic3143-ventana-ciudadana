'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSenador = sequelize.define('UserSenador', {
    uid: DataTypes.INTEGER,
    sid: DataTypes.INTEGER
  }, {});
  UserSenador.associate = function(models) {
    // associations can be defined here
  };
  return UserSenador;
};