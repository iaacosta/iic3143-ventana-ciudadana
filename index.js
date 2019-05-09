/* eslint no-console: "off" */

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || (process.env.NODE_ENV === 'test' && 4000) || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    if (process.env.NODE_ENV !== 'test')
      console.log('Connection to the database has been established successfully.');
  })
  .catch(err => console.error('Unable to connect to the database:', err));

const server = app.listen(PORT, err => {
  if (err) {
    return console.error('Failed', err);
  }
  if (process.env.NODE_ENV !== 'test') console.log(`Listening on port ${PORT}`);
  return app;
});

module.exports = {
  server,
};
