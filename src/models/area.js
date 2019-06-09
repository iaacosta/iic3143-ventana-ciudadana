'use strict';
module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define(
    'Area',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  Area.associate = function(models) {
    Area.belongsToMany(models.Comition, {
      through: models.AreaComition,
      foreignKey: 'aid',
    });
  };
  return Area;
};
