'use strict';
module.exports = (sequelize, DataTypes) => {
  const senador_proyecto = sequelize.define('senador_proyecto', {
    sid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER
  }, {});
  senador_proyecto.associate = function(models) {
    // associations can be defined here
  };
  return senador_proyecto;
};