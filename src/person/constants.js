require('dotenv').config();

module.exports = {
  sqlConfig: {
    user: 'sa',
    password: 'carlos123',
    database: 'client',
    server: 'localhost',
    port: 50841,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
};
