const express = require('express')
const sequelize = require('sequelize')
const { CartItems, Products } = require('../db')

const route = express.Router()

route.post(
    '/',
    async (req, res) => {
        await CartItems.destroy({where: {id: req.body.id}})
        // res.redirect('/addtocart')
        let cartItems = await CartItems.findAll({
            include: [Products]
        })
        res.send(cartItems)
    })
    
    module.exports = route
    