const express = require('express')
const route = express.Router()


route.get(
    '/',
    (req, res) => {
        console.log(req.user)
        
        res.send({
            name: req.user.name,
            id: req.user.id,
            success: true
        })
    })

module.exports = route