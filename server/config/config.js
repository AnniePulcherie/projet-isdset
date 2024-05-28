const Seq = require('sequelize');

const sequelize = new Seq('isdset','root','',{
    host:'localhost',
    dialect:'mysql'
});

module.exports = sequelize;