const express = require('express')
const app = express()
const mongoose = require('./db/dbHandler')
var hbs = require('hbs');

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
hbs.registerPartials(__dirname + '/views/partials/')
app.use(express.static(__dirname + '/public'))

// const adminController = require('./controller/admin')
// const shoppingcart = require('./controller/shoppingcart')
//cac request co chua /admin se di den controller admin
// app.use('/admin', adminController)

// app.use('/shoppingcart', shoppingcart)

app.get('/',(req,res)=>{
    res.render('index')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)