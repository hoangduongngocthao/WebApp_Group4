const express = require('express');
const router = express.Router();
// const multer = require('multer');
const mongoose = require('mongoose');
const adminController = require('../controller/admin');
const { isAdmin } = require("../middlerware/auth");


// // // const storageStaff = multer.diskStorage({
// // //     destination:function(req, file, callback){
// // //         callback(null, 'public/uploads/staff');
// // //     },
// // //     //add back the extension
// // //     filename:function(req, file, callback){
// // //         callback(null, Date.now()+file.originalname);
// // //     },
// // // })

// // // //upload parameters for multer
// // // const uploadStaff = multer({
// // //     storage:storageStaff,
// // //     limits:{
// // //         fieldSize:1024*1024*3
// // //     },
// // // })

// router.get("/admin/feedbackManage", isAdmin, adminController.feedbackManage)

router.get("/admin", isAdmin, adminController.getAdmin)

module.exports = router;
