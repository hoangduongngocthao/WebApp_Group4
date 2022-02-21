const express = require('express')
const router = express.Router()
// const multer = require('multer')
const mongoose = require('mongoose');
const shoppingcart = require('../controller/shoppingcart')
const bookDetail = require('../controller/bookController')


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

router.get("/shoppingcart", shoppingcart.getCart)

router.get("/bookDetail", bookDetail.getBookDetail)


// router.post("/", shoppingcart.doShoppingCart)
module.exports = router;
