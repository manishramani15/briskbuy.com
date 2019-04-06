const express = require('express')
const { db } = require('./db')
const session = require('express-session')

const passport = require('./passport')

app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')

app.use(session({
    secret: 'h24b5jh245bk24',
    resave: false,
    saveUninitialized: true
  }))

  
app.use(passport.initialize())
app.use(passport.session())

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
    addproduct: require('./routes/addproduct'),
    loadproducts: require('./routes/loadproducts'),
    addtocart: require('./routes/addtocart'),
    loginsuccess: require('./routes/loginsuccess'),
    loginfail: require('./routes/loginfail'),
    credentialsbyid: require('./routes/credentialsbyid'),
    buy: require('./routes/buy')
    // search: require('./routes/search')
}

app.use('/signup', routes.signup)
app.use('/login', routes.login)
app.use('/vendorsignup', routes.vendorsignup)
app.use('/vendorlogin', routes.vendorlogin)
app.use('/addproduct', routes.addproduct)
app.use('/loadproducts', routes.loadproducts)
app.use('/addtocart', routes.addtocart)
app.use('/loginsuccess', routes.loginsuccess)
app.use('/loginfail', routes.loginfail)
app.use('/credentialsbyid', routes.credentialsbyid)
app.use('/buy', routes.buy)
// app.use('/search', routes.search)



db.sync({ alter: true })
.then(() => {
    app.listen(9876, () => {
        console.log('Server started on http://localhost:9876')
    })
})
.catch(console.error)