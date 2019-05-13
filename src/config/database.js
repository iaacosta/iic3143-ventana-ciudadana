require('dotenv').config()

const config = {
  default: {
    username: process.env.DB_USERNAME || 'ventana_ciudadana',
    password: process.env.DB_PASSWORD || 'iic2513',
    dialect: process.env.DB_DIALECT || 'postgres',
    database: process.env.DB_NAME || 'ventana_ciudadana',
    host: process.env.DB_HOST || '127.0.0.1',
    operatorsAliases: false,
  },
  development: {
    extend: 'default',
    database: process.env.DB_NAME || 'ventana_ciudadana',
  },
  test: {
    extend: 'default',
    logging: false,
    database: 'ventana_ciudadana_test',
  },
  production: {
    extend: 'default',
    use_env_variable: 'DATABASE_URL',
  },
};

Object.keys(config).forEach(configKey => {
  const configValue = config[configKey];
  if (configValue.extend) {
    config[configKey] = Object.assign({}, config[configValue.extend], configValue);
  }
});

module.exports = config;
