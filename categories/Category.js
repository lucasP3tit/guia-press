const Sequelize = require("sequelize");
const connection = require("../database/database");

const category = connection.define("tb_categories",{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = category;