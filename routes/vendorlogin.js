const express = require('express')
const { Vendors } = require('../db')

const route = express.Router()

route.post(
    '/',
    (req, res) => {
        // console.log(req.body)
        // console.log(req.body.email)
        // console.log(req.body.loginCredentials.email)

        let username = req.body.loginUsername
        let password = req.body.loginPassword
        return Vendors.findOne({ where: {email: username, password: password}})
        .then((row) => {
            if(row !== null) {
                return res.send({name: row.name, success: true, id: row.id})
            } else {
                res.send({success: false})
            }
        })
    }
)
module.exports = route