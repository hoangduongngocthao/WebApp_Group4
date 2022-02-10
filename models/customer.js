const mongoose = require('../db/dbHandler')

const customerSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    education:{
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "user.png"
    }
 
})

module.exports = mongoose.model('Customers', customerSchema)