const express = require('express')
const { db, Users} = require('./db')

app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', express.static(__dirname + '/public'))

const routes = {
    signup: require('./routes/signup'),
    login: require('./routes/login')
}

app.use('/signup', routes.signup)
app.use('/login', routes.login)


db.sync({ alter: true })
.then(() => {
    app.listen(9876, () => {
        console.log('Server started on http://localhost:9876')
    })
})
.catch(console.error)