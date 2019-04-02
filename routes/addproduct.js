const express = require('express')
const { Products, Vendors } = require('../db')

const route = express.Router()

let vendor = { id: '0' }

route.get(
    '/', 
    (req, res) => {
        if(req.query.id) {
            vendor.id = req.query.id
        }
        return Products.findAll({ where: {vendorId: vendor.id }})
        .then((products) => {
            res.send({products})
        }) 
    }
)

route.post(
    '/',
    (req, res) => {
        Products.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            vendorId: req.body.vendorId
        })
        res.redirect('/')
    }
)
module.exports = route