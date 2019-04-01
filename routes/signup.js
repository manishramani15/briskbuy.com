const express = require('express')
const { Users } = require('../db')

const route = express.Router()

route.post(
    '/',
    (req,res) => {
        // let reqEmail = req.body.signupUsername
        Users.count({ where: { email: req.body.email } })
        .then((count) => {
            if(count > 0) {
                return res.send({success: false})
            } else {
                if(req.body.password) {
                    Users.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    res.send({success: true})
                }
            }        
        })
    })
    
    module.exports = route