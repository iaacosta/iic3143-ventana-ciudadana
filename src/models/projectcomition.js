'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectComition = sequelize.define('ProjectComition', {
    cid: DataTypes.INTEGER,
    pid: DataTypes.INTEGER
  }, {});
  ProjectComition.associate = function(models) {
    // associations can be defined here
  };
  return ProjectComition;
};