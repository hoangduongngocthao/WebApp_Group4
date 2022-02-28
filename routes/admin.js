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

router.get("/admin/registerAccount", isAdmin, adminController.getRegisterAccount)

router.post("/admin/doAddAccount", isAdmin, adminController.postRegisterAccount)

router.get("/admin/adminViewCustomer", isAdmin, adminController.viewAllAccount)

router.get("/admin/adminAddCustomer", isAdmin, adminController.addCustomer)

router.post("/admin/doAddCustomer", isAdmin, adminController.doAddCustomer)

router.get("/admin/adminEditCustomer", isAdmin, adminController.editCustomer)

router.post("/admin/doEditCustomer", isAdmin, adminController.doEditCustomer)

router.get("/admin/adminBookDetail", isAdmin, adminController.getBookDetail)

router.get("/admin/adminAddBook", isAdmin, adminController.viewAddBook)

router.post("/admin/doAddBook", isAdmin, adminController.addBook)

router.get("/admin/adminEditBook", isAdmin, adminController.editBook)

router.post("/admin/doEditBook", isAdmin, adminController.doEditBook)

router.get("/admin/doDeleteBook", isAdmin, adminController.doDeleteBook)

router.get("/admin/doDeleteCustomer", isAdmin, adminController.doDeleteCustomer)

module.exports = router;
