/* eslint no-console: "off" */

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 3000;
const { NODE_ENV } = process.env;

const init = async port => {
  try {
    await db.sequelize.authenticate();
    if (NODE_ENV !== 'test')
      console.log('Connection to the database has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }

  let server;
  try {
    // eslint-disable-next-line consistent-return
    server = await app.listen(port, () => {
      if (NODE_ENV !== 'test') console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed', err);
  }

  return server;
};

if (NODE_ENV !== 'test') init(PORT);

module.exports = {
  init,
};
