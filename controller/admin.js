// const express = require('express')
// const { insertObject } = require('../db/dbHandler')
// const router = express.Router()

// //neu request la: /admin
// router.get('/',(req,res)=>{
//     res.render('adminHome')
// })

// //neu request la: /admin/addUser
// router.get('/addUser',(req,res)=>{
//     res.render('addUser')
// })

// //Submit add User
// router.post('/addUser',(req,res)=>{
//     const name = req.body.txtName
//     const role = req.body.Role
//     const pass= req.body.txtPassword
//     const objectToInsert = {
//         userName: name,
//         role:role,
//         password: pass
//     }
//     insertObject("Users",objectToInsert)
//     res.render('adminHome')
// })

// module.exports = router;

