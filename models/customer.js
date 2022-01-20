const mongoose = require('../db/dbHandler')

const customerSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },

    email: {
        type: 'string',
        required: true,
        unique: true
    },

    img: {
        type: String,
        default: "user.png"
    },

    password: {
        type: String,
        required: true,
    },
    
    Role:{
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Customer', customerSchema)