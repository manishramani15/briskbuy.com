const sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'mysql',
    database: `briskbuy.com`,
    username: 'manish',
    password: 'manish@briskbuy'
})