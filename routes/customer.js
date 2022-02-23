const express = require('express')
const router = express.Router()
// const multer = require('multer')
const mongoose = require('mongoose');
const customerController = require('../controller/customer')
const { isCustomer } = require("../middlerware/auth");


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

router.get("/customer", customerController.getCustomer)

router.get("/customer/bookDetail", customerController.getBookDetail)

router.get("/customer/orderDetail", customerController.getOrderDetail)

router.post("/customer/doAddToCart", customerController.postAddtocart)




module.exports = router;
