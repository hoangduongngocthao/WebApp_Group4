const customer = require('../models/customer');
const Account = require('../models/user');
const book = require('../models/book');

const express = require('express');

// //view book
// exports.viewAllBook = async(req,res)=>{
//     console.log( req.session.book)
//     res.render('customerViewBook',{bookDetail: req.session.book,  loginName : req.session.email})
// }

// exports.getCart = async(req, res) => {
//     res.render('shoppingcart')
// }

exports.getCustomer = async(req, res) => {
    var listBook = await book.find()
    res.render('customer/customerPage', { loginName: req.session.email , listBook: listBook })
}

exports.getBookDetail = async(req, res) => {
    let id = req.query.id
    console.log(id)
    let bookDetail = await book.findById(id)
    res.render('customer/bookDetail', { bookDetail: bookDetail })
}