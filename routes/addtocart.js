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
        async (req, res) => {
            return Products.findOne({ where: {id: req.body.id}})
            .then(async (product) => {
                let cartItem = await CartItems.sum('quantity', {where: {productId: req.body.id}})
                console.log(cartItem)
                if(cartItem) {
                    if (product.quantity > cartItem) {
                        return true
                    }
                    else {
                        return false
                    }
                } else {
                    if(product.quantity > 0) {
                        return true
                    }
                }
            })
            .then((success) => {
                if(success === true) {
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
                    })
                    .then((cartItems) => {
                        return res.send(cartItems)
                    })
                } else {
                    res.send({exceed: true})
                }
            })
            
        })
        
        module.exports = route
        