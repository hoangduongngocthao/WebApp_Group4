const mongoose = require('../db/dbHandler');

const bookSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Book', bookSchema);