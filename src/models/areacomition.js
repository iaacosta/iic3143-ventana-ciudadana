'use strict';
module.exports = (sequelize, DataTypes) => {
  const AreaComition = sequelize.define(
    'AreaComition',
    {
      aid: DataTypes.INTEGER,
      cid: DataTypes.INTEGER,
    },
    {},
  );
  AreaComition.associate = function(models) {
    // associations can be defined here
  };
  return AreaComition;
};
