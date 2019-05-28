const { spawn } = require('child_process');

const env = Object.create(process.env);
env.NODE_ENV = 'test';

const spawnOptions = { stdio: 'ignore', env };

const setUp = () => {
  return new Promise((resolve, reject) => {
    const migration = spawn('sequelize', ['db:migrate'], spawnOptions);
    migration.on('close', migrateCode => {
      if (migrateCode !== 0)
        reject(new Error(`db:migrate failed ERRCODE=${migrateCode}`));
      resolve();
    });
  });
};

const tearDown = () => {
  return new Promise((resolve, reject) => {
    const undo = spawn('sequelize', ['db:migrate:undo:all'], spawnOptions);
    undo.on('close', undoCode => {
      if (undoCode !== 0)
        reject(new Error(`db:migrate:undo:all failed ERRCODE=${undoCode}`));
      resolve();
    });
  });
};

module.exports = {
  setUp,
  tearDown,
};
