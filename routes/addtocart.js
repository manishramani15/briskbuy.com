const express = require('express')
const sequelize = require('sequelize')
const { CartItems, Products } = require('../db')

const route = express.Router()

route.get(
    '/', 
    async (req, res) => {
        const cartItems = await CartItems.findAll({
            where: { userId: req.query.userId },
            include: [Products]
        })
        res.send(cartItems)
    })
    
    route.post(
        '/',
        (req, res) => {
            return CartItems.count({ where: {productId: req.body.id, userId: req.body.userId}})
            .then((count) => {
                if(count > 0) {
                    return CartItems.update({ quantity: sequelize.literal('quantity + 1')}, { where: { productId: req.body.id, userId: req.body.userId } } )
                } else {
                    return CartItems.create({
                        productId: req.body.id,
                        userId: req.body.userId
                    })
                }
            })
            .then(() => {
                return CartItems.findAll({
                    where: { userId: req.body.userId },
                    include: [Products]
                })
                // res.redirect('/addtocart')
            })
            .then((cartItems) => {
                console.log(cartItems)
                res.send(cartItems)
            })
        })
        
        module.exports = route
        