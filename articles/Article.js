const Sequelize = require("sequelize");
const connection = require("../database/database");

const article = connection.define("tb_articles",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = article;