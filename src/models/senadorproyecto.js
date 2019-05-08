'use strict';
module.exports = (sequelize, DataTypes) => {
  const SenadorProyecto = sequelize.define('SenadorProyecto', {
    sid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER
  }, {});
  SenadorProyecto.associate = function (models) {
    // associations can be defined here
  };
  return SenadorProyecto;
};
