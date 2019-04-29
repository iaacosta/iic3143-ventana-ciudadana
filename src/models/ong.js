'use strict';
module.exports = (sequelize, DataTypes) => {
  const ong = sequelize.define('ong', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  ong.associate = function(models) {
    // associations can be defined here
  };
  return ong;
};