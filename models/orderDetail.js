const mongoose = require('../db/dbHandler')

const orderDetailSchema = new mongoose.Schema({
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

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
})

module.exports = mongoose.model('OrderDetail', orderDetailSchema)