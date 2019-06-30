'use strict';
module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define('Milestone', {
    pid: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    a_favor: DataTypes.INTEGER,
    en_contra: DataTypes.INTEGER,
    abstencion: DataTypes.INTEGER,
    pareo: DataTypes.INTEGER
  }, {});
  Milestone.associate = function(models) {
    // associations can be defined here
  };
  return Milestone;
};