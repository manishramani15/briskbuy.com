const express = require('express')
const sequelize = require('sequelize')
const { CartItems, Invoice, Products } = require('../db')

const route = express.Router()

route.get(
    '/',
    async (req, res) => {
        let cartItems = await CartItems.findAll({
            where: { userId: req.query.userId },
            include: [Products]
        })
        let flag = true
        cartItems.forEach((cartItem) => {
            if(cartItem.quantity > cartItem.product.quantity)
            {
                flag = false;
                return res.send({success: false, name: cartItem.product.name, quantity: cartItem.product.quantity})
            }
        })
        if(flag) {
            cartItems.forEach(async (cartItem) => {
                await Products.update({ quantity: sequelize.literal(`quantity - ${cartItem.quantity}`)}, { where: { id: cartItem.productId } } )
                await Invoice.create({
                    quantity: cartItem.quantity,
                    productId: cartItem.productId,
                    userId: cartItem.userId,
                    vendorId: cartItem.product.vendorId
                })
                await CartItems.destroy({
                    where: {
                        quantity: cartItem.quantity,
                        productId: cartItem.productId,
                        userId: cartItem.userId
                    }
                })
            })
            res.send({success: true})
        }
    })
    
    module.exports = route
    