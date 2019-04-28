const Sequelize = require('sequelize');
const Senador = require('./models/Senador');

const sequelize = new Sequelize(process.env.PSQL_URI, {
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

Senador(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => console.log('PostgreSQL connection established'))
  .catch(err => console.error(err));

sequelize
  .sync()
  .then(() => console.log('PostgreSQL database online'))
