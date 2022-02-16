const trainee = require('../models/trainee');
const Account = require('../models/user');
const book = require('../models/course');
const bookDetail = require('../models/bookDetail')

const express = require('express');

// //view book
// exports.viewAllBook = async(req,res)=>{
//     console.log( req.session.book)
//     res.render('customerViewBook',{bookDetail: req.session.book,  loginName : req.session.email})
// }


