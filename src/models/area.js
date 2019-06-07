'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    'Area',
    {
      aid: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {},
  );
  Area.associate = function(models) {
    // associations can be defined here
  };
  return Area;
};
