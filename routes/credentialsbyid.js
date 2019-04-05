const express = require('express')
const { Users } = require('../db')

const route = express.Router()

route.post(
    '/',
    async (req, res) => {
        let user = await Users.findOne({where: {id: req.body.id}})
        console.log(user)
        res.send(user)
    }
)

module.exports = route