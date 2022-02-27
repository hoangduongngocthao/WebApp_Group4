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

router.get("/admin", adminController.getAdmin)

router.get("/admin/registerAccount", adminController.getRegisterAccount)

router.post("/admin/doAddAccount", adminController.postRegisterAccount)

router.get("/admin/adminViewCustomer", adminController.viewAllAccount)

router.get("/admin/adminAddCustomer", adminController.addCustomer)

router.post("/admin/doAddCustomer", adminController.doAddCustomer)

router.get("/admin/adminEditCustomer", adminController.editCustomer)

router.post("/admin/doEditCustomer", adminController.doEditCustomer)

router.get("/admin/adminBookDetail", adminController.getBookDetail)

router.get("/admin/adminAddBook", adminController.viewAddBook)

router.post("/admin/doAddBook", adminController.addBook)

router.get("/admin/adminEditBook", adminController.editBook)

router.post("/admin/doEditBook", adminController.doEditBook)

router.post("/admin/doDeleteBook", adminController.doDeleteBook)


module.exports = router;
