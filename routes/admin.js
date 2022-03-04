const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const adminController = require('../controller/admin');
const { isAdmin } = require("../middlerware/auth");
const upload = require('../middlerware/upload');



//-------------------------------Customer Router-------------------------------------------

router.get("/admin", isAdmin, adminController.getAdmin)

router.get("/admin/registerAccount", isAdmin, adminController.getRegisterAccount)

router.post("/admin/doAddAccount", isAdmin, adminController.postRegisterAccount)

router.get("/admin/adminViewCustomer", isAdmin, adminController.viewAllAccount)

router.get("/admin/adminAddCustomer", isAdmin, adminController.addCustomer)

router.post("/admin/doAddCustomer", upload.single('image'), isAdmin, adminController.postDoAddCustomer)

router.get("/admin/adminEditCustomer", isAdmin, adminController.editCustomer)

router.post("/admin/doEditCustomer", isAdmin,upload.single('image'), adminController.postDoEditCustomer)

router.get("/admin/doDeleteCustomer", isAdmin, adminController.doDeleteCustomer)

router.post("/admin/doSearchCustomer", isAdmin, adminController.doSearchCustomer)


//-------------------------------Book Router-------------------------------------------

router.get("/admin/adminBookDetail", isAdmin, adminController.getBookDetail)

router.get("/admin/adminAddBook", isAdmin, adminController.viewAddBook)

router.post("/admin/doAddBook", upload.single('picture'), isAdmin, adminController.addBook)

router.get("/admin/adminEditBook", isAdmin, adminController.editBook)

router.post("/admin/doEditBook", upload.single('image'), isAdmin, adminController.doEditBook)

router.get("/admin/doDeleteBook", isAdmin, adminController.doDeleteBook)

router.post("/admin/doSearchBook", isAdmin, adminController.doSearchBook)


module.exports = router;
