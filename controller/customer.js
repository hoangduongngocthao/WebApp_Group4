const customer = require('../models/customer');
const Account = require('../models/user');
const book = require('../models/book');
const orderDetail = require('../models/orderDetail');

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
    var currentCustomer = await customer.find({email: req.session.email}).populate('orderDetail')
    console.log(currentCustomer)
    // if (currentCustomer.orderDetail.length == 0) {
        let newOrderDetail = new orderDetail({ 
            customer: currentCustomer._id,
        })
        newOrderDetail = await newOrderDetail.save()
        // }
    var OrderDetail = await orderDetail.find({_id: currentCustomer._id}).populate('customer');
    await orderDetail.findByIdAndUpdate(newOrderDetail._id,
        {$push :{customer:currentCustomer._id}},
        { new: true, useFindAndModify: false })
        
    await customer.findByIdAndUpdate(currentCustomer._id,
        {$push :{orderDetail:OrderDetail._id}},
        { new: true, useFindAndModify: false })

    console.log(OrderDetail)
    res.render('customer/customerPage', { loginName: req.session.email , listBook: listBook })
}

exports.getBookDetail = async(req, res) => {
    let id = req.query.id
    let bookDetail = await book.findById(id)
    res.render('customer/bookDetail', { bookDetail: bookDetail })
}

exports.getOrderDetail = async(req, res) => {
    var currentCustomer = customer.find({email: req.session.email})
    var OderDetail = await orderDetail.find({_id: {$in: currentCustomer._id}}).populate('orderDetail');
    var listBookOrderDetail = await book.find({_id: {$in: OderDetail._id}})
    res.render('customer/orderDetail', { OderDetail: OderDetail , listBookOrderDetail: listBookOrderDetail})
}

exports.postAddtocart = async (req, res) => {
    let id = req.body.id
    var currentCustomer = customer.find({email: req.session.email})
    var OderDetail = await orderDetail.find({_id: {$in: currentCustomer._id}}).populate('orderDetail');
    let bookDetail = await book.findById(id)
    console.log(id)
    let quantityBefore = bookDetail.quantity
    console.log('quantityBefore' + quantityBefore)
    let quantityForAdd = req.body.quantity
    console.log( 'quantityForAdd' + quantityForAdd)
    let quantityAfter = quantityBefore - quantityForAdd
    console.log('quantityAfter' + quantityAfter)
    await book.findByIdAndUpdate({_id: id}, {$set: {quantity: quantityAfter}})
    await orderDetail.findByIdAndUpdate(OderDetail._id,
        {$push :{book:id}},
        { new: true, useFindAndModify: false })
    res.redirect('/customer/orderDetail')
}