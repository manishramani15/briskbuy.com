const Sequelize = require('sequelize')

// const db = new Sequelize({
//     dialect: 'mysql',
//     database: `briskbuy.com`,
//     username: 'manish', //manish@localhost
//     password: 'manish@briskbuy'
// })


const username = "manish"
const password = "manish@briskbuy"
const host = "localhost"
const port = "3306"
const dbname = `briskbuy.com`

const DB_URL = process.env.DATABASE_URL ||
  `mysql://${username}:${password}@${host}:${port}/${dbname}`
//postgres://wskoiibcvvrotm:f6bf35f06bf740bb499188afad61f5865caa0d2bf121966b9e6df88628a1e0c6@ec2-174-129-229-106.compute-1.amazonaws.com:5432/d1ps8ds6tnjhvh
const db = new Sequelize(DB_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
  })
//

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
        lat: {
            type: Sequelize.FLOAT
        },
        lon: {
            type: Sequelize.FLOAT
        }
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
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        lon: {
            type: Sequelize.FLOAT,
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