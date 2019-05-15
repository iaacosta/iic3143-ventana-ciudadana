'use strict';
module.exports = (sequelize, DataTypes) => {
  const Update = sequelize.define('Update', {
    createdAt: DataTypes.DATE
  }, {});
  Update.associate = function(models) {
    // associations can be defined here
  };
  return Update;
};