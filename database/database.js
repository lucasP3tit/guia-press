const Sequelize = require("sequelize");

const connection = new Sequelize(
    "guia-press",
    "root",
    "1234567890",
    {
        host:"localhost",
        dialect: "mysql",
        timezone: "-03:00"
    }

);

module.exports = connection;