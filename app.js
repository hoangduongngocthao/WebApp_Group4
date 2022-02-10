const express = require('express')
const app = express()
const mongoose = require('./db/dbHandler')
const bodyParser = require('body-parser')
// session = require('express-session')
var hbs = require('hbs');

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
hbs.registerPartials(__dirname + '/views/partials/')
// hbs.registerHelper('dateFormat', require('handlebars-dateformat'))
app.use(express.static(__dirname + '/public'))

// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 3600000 }
// }));

// const adminController = require('./controller/admin')
// const shoppingcart = require('./controller/shoppingcart')
//cac request co chua /admin se di den controller admin
// app.use('/admin', adminController)
// app.use('/shoppingcart', shoppingcart)

app.get('/',(req,res)=>{
    res.render('index')
})

const authRoute = require("./routes/auth")
var adminRoute = require('./routes/admin.js')
var customerRoute = require('./routes/customer.js')


// app.use("/", authRoute)
// app.use("/", adminRoute)
// app.use("/", customerRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)