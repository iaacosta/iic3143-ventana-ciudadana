'use strict';
module.exports = (sequelize, DataTypes) => {
  const SenatorComition = sequelize.define('SenatorComition', {
    cid: DataTypes.INTEGER,
    sid: DataTypes.INTEGER
  }, {});
  SenatorComition.associate = function(models) {
    // associations can be defined here
  };
  return SenatorComition;
};