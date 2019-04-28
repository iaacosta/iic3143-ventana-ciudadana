const Sequelize = require('sequelize');
const SenadorModel = require('./models/Senador');

const sequelize = new Sequelize(process.env.PSQL_URI, {
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Senador = SenadorModel(sequelize, Sequelize);

sequelize
  .sync()
  .then(() => console.log('PostgreSQL connection established'))
  .catch(err => console.error(err));

module.exports = {
  Senador,
};
