const mongoose = require('../db/dbHandler')

const shoppingcartSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },

    quantity: {
        type: 'string',
        required: true
    },

    price: {
        type: 'string',
        required: true
    },

    img: {
        type: String,
        default: "user.png"
    },
})

module.exports = mongoose.model('Shoppingcart', shoppingcartSchema)