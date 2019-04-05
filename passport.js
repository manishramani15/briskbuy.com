const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const {
  Users
} = require('./db')


passport.use(new LocalStrategy(
  (username, password, done) => {
    Users.findOne({
      where: {
       email: username
      }
    }).then((user) => {
      if (!user) {
        return done(null, false, {success: false})
      }
      if (user.password !== password) {
        return done(null, false, {success: false})
      }
      done(null, user, {success: true})
    }).catch(done)
  }
))

passport.serializeUser(
  (user, done) => {
    done(null, user.id)
  }
)

passport.deserializeUser(
  (userId, done) => {
    Users.findByPk(userId)
      .then((user) => done(null, user))
      .catch(done)
  }
)

module.exports = passport