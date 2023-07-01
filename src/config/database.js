const dbConfig = {
  dialect: 'sqlite',
  storage: './deel.sqlite3',
  // Set the maximum number of concurrent connections
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
};

module.exports = {
  dbConfig,
};
