const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'mysql',
    database: `briskbuy.com`,
    username: 'manish',
    password: 'manish@briskbuy'
})

const Users = db.define(
    'users', 
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    }
)

module.exports = {
    db, Users
}