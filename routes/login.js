const express = require('express')
const { Users } = require('../db')

const route = express.Router()
const passport = require('passport')

route.post(
    '/',
  passport.authenticate('local', {
    successRedirect: '/loginsuccess',
    failureRedirect: '/loginfail'
  })
)

module.exports = route