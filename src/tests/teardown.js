const migrations = require('./helpers/migration');

module.exports = async () => {
  await migrations.tearDown();
};
