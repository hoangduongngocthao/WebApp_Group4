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

router.get("/customer", isCustomer, customerController.getCustomer)

router.get("/customer/bookDetail", isCustomer, customerController.getBookDetail)

router.get("/customer/orderDetail", isCustomer, customerController.getOrderDetail)

router.post("/customer/doAddToCart", isCustomer, customerController.postAddtocart)

router.get("/customer/getRemoveFromCart", isCustomer, customerController.getRemoveFromCart)

router.get('/customer/updateProfile', isCustomer, customerController.getProfile);

router.post('/customer/doUpdateProfileCustomer', isCustomer, customerController.updateProfile);


module.exports = router;
