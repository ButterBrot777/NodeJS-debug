const Sequelize = require('sequelize');
const userTemplate = require('./models/user');
const gameTemplate = require('./models/game');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false
})

sequelize.authenticate().then(
    function success() {
        console.log("Connected to DB");
    },

    function fail(err) {
        console.log(`Error: ${err}`);
    }
)

sequelize.sync();

const User = userTemplate(sequelize, Sequelize.DataTypes)
const Game = gameTemplate(sequelize, Sequelize.DataTypes)

module.exports = { User, Game }
