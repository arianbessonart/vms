var config = {
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/vermis',
  port: process.env.PORT || 8082,
};

module.exports = config;
