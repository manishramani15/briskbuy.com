const express = require('express')
const route = express.Router()

route.get(
    '/',
    (req, res) => {
        res.send({success: false})
    })

module.exports = route