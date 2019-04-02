const express = require('express')
const { db, Users} = require('./db')

app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('users')
})

app.get('/vendors', (req, res) => {
    res.render('vendors')
})

const routes = {
    signup: require('./routes/signup'),
    login: require('./routes/login'),
    vendorlogin: require('./routes/vendorlogin'),
    vendorsignup: require('./routes/vendorsignup'),
    addproduct: require('./routes/addproduct')
}

app.use('/signup', routes.signup)
app.use('/login', routes.login)
app.use('/vendorsignup', routes.vendorsignup)
app.use('/vendorlogin', routes.vendorlogin)
app.use('/addproduct', routes.addproduct)


db.sync({ alter: true })
.then(() => {
    app.listen(9876, () => {
        console.log('Server started on http://localhost:9876')
    })
})
.catch(console.error)