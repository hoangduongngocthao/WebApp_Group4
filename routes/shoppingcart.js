const express = require('express')
const router = express.Router()
const multer = require('multer')
const shoppingcartController = require('../controller/shoppingcart')

// const storage = multer.diskStorage({
//     destination:function(req, file, callback){
//         callback(null, 'public/uploads/shoppingcarts');
//     },
//     //add back the extension
//     filename:function(req, file, callback){
//         callback(null, Date.now()+file.originalname);
//     },
// })

// //upload parameters for multer
// const upload = multer({
//     storage:storage,
//     limits:{
//         fieldSize:1024*1024*3
//     },
// })


