const { spawn } = require('child_process');

const env = Object.create(process.env);
env.NODE_ENV = 'test';

const migrate = () => {
  const spawnOptions = { stdio: 'ignore', env };

  const undo = spawn('sequelize', ['db:migrate:undo:all'], spawnOptions);
  undo.on('close', undoCode => {
    if (undoCode !== 0) throw new Error('db:migrate:undo:all failed');

    const migration = spawn('sequelize', ['db:migrate'], spawnOptions);
    migration.on('close', migrateCode => {
      if (migrateCode !== 0) throw new Error('db:migrate failed');
    });
  });
};

module.exports = {
  migrate,
};
