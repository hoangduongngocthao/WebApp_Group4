const mongoose = require('../db/dbHandler');

const bookDetailSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    customer:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('BookDetail', bookDetailSchema);