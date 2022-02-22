const mongoose = require('../db/dbHandler')

const shoppingcartSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
})

module.exports = mongoose.model('shoppingcart', shoppingcartSchema)