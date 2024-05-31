const Seq = require('sequelize');

const isdset = process.env.MYSQLDATABASE;
console.log(isdset);
// const sequelize = new Seq('mysql://root:yOYYXZJNXhvHyCPBXospfnjexWKnmgXK@roundhouse.proxy.rlwy.net:23449/railway');
const sequelize = new Seq(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false,
    dialectOptions: {
        connectTimeout: 10000
    }
  });

module.exports = sequelize;