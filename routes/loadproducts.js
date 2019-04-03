const express = require('express')
const { Products } = require('../db')

const route = express.Router()

route.get(
    '/',
    (req, res) => {
        return Products.findAll()
        .then((products) => {
            res.send(products)
        })
    })
    
    module.exports = route