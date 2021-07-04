const mysql = require('mysql2');
const config = require('../config');

const conection = mysql.createConnection(config.mysql);

conection.connect((error) => {
  if (error) {
    console.error(error);
    process.exit();
  }
  console.info('conectado correctamente');
});

module.exports = conection;

