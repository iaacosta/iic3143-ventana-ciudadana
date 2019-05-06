'use strict';
module.exports = (sequelize, DataTypes) => {
  const periodos = sequelize.define('periodo', {
    sid: DataTypes.INTEGER,
    cargo: DataTypes.STRING,
    inicio: DataTypes.INTEGER,
    final: DataTypes.INTEGER,
  });
  periodos.associate = function(models) {
    periodos.belongsTo(models.senador, { foreignKey: 'sid' });
  };
  return periodos;
};
