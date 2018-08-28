require('dotenv').config()
const {json} = require('body-parser')
const express = require('express')
const session = require('express-session')

const {checkForSession} = require('./middlewares/checkForSession')

const {read} = require('./controllers/swag_controller')
const {add, remove, checkout} = require('./controllers/cart_controller')
const {login, register, signout, getUser} = require('./controllers/auth_controller')
const {search} = require('./controllers/search_controller')


const app = express()


app.use(json())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)
app.use( express.static( `${__dirname}/build` ) );

//AUTH
app.post( '/api/login', login );
app.post( '/api/register', register );
app.post( '/api/signout', signout );
app.get( '/api/user', getUser );

//CART
app.get('/api/swag', read)
app.post('/api/cart', add)
app.post('/api/cart/checkout', checkout)
app.delete('/api/cart', remove)

//SEARCH
app.get('/api/search', search)



app.listen(3000, ()=>console.log(`Listening on port: 3000`))