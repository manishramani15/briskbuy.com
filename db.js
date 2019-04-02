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
    })
    
    const Vendors = db.define('vendor', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
    
    const Products = db.define('product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        image: {
            type: Sequelize.STRING,
            defaultValue: '../images/default.gif'
        }
    })
    
    Vendors.hasMany(Products)
    Products.belongsTo(Vendors)
    
    const CartItems = db.define('cartitem', {
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 1
        },
    })
    
    CartItems.belongsTo(Users)
    Users.hasMany(CartItems)
    
    CartItems.belongsTo(Products)
    Products.hasMany(CartItems)

    const Invoice = db.define('invoice', {
        quantity : {
            type: Sequelize.INTEGER,
            defaultValue: 1
        }
    })
    
    Products.hasMany(Invoice)
    Invoice.belongsTo(Products)

    Users.hasMany(Invoice)
    Invoice.belongsTo(Users)

    Vendors.hasMany(Invoice)
    Invoice.belongsTo(Vendors)

    module.exports = {
        db, Users, Vendors, Products, Invoice, CartItems
    }