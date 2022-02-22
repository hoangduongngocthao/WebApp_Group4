const mongoose = require('../db/dbHandler');

const bookSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    img:{
        type: String,
        default: "bookdefault.jpg"
    },
});

module.exports = mongoose.model('Book', bookSchema);