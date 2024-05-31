require('dotenv').config();
const { exec } = require('child_process');
const sequelize = require('./config/config');

const DB_USER = process.env.MYSQLUSER;
const DB_PASSWORD = process.env.MYSQLPASSWORD;
const DB_NAME = process.env.MYSQLDATABASE;
const DB_HOST = process.env.MYSQLHOST;

console.log(DB_USER, DB_NAME);
// Testez la connexion à la base de données avant de faire la sauvegarde
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    
    const command = `mysqldump --databases ${DB_NAME} -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} -P 3306> backup.sql`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

