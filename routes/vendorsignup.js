const express = require('express')
const { Vendors } = require('../db')

const route = express.Router()

route.post(
    '/',
    (req,res) => {
        // let reqEmail = req.body.signupUsername
        Vendors.count({ where: { email: req.body.email } })
        .then((count) => {
            if(count > 0) {
                return res.send({success: false})
            } else {
                if(req.body.password) {
                    Vendors.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        lat: req.body.lat,
                        lon: req.body.lon
                    })
                    res.send({success: true})
                }
            }        
        })
    })
    
    module.exports = route