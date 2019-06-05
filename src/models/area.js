'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    aid: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  area.associate = function(models) {
    // associations can be defined here
  };
  return area;
};