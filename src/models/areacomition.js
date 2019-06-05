'use strict';
module.exports = (sequelize, DataTypes) => {
  const areacomition = sequelize.define('areacomition', {
    aid: DataTypes.INTEGER,
    cid: DataTypes.INTEGER
  }, {});
  areacomition.associate = function(models) {
    // associations can be defined here
  };
  return areacomition;
};