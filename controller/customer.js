const customer = require('../models/customer');
const Account = require('../models/user');
const book = require('../models/book');
const orderDetail = require('../models/orderDetail');

const express = require('express');



exports.getCustomer = async(req, res) => {
    var listBook = await book.find()
    var currentCustomer = await customer.findOne({email: req.session.email}).populate('orderDetail')
    // console.log("id: " + currentCustomer._id)
    let newOrderDetail 
    if (currentCustomer.orderDetail.length < 1 ) {
        newOrderDetail = new orderDetail({ 
            customer: currentCustomer._id,
        })
        newOrderDetail = await newOrderDetail.save()
        await customer.findByIdAndUpdate(currentCustomer._id,
            {$push :{orderDetail:newOrderDetail._id}},
            { new: true, useFindAndModify: false })
        }
    else {
        newOrderDetail = await orderDetail.findOne({_id: currentCustomer.orderDetail})
       
    }   
  
    if (newOrderDetail.customer.length <= 0) {
        await orderDetail.findByIdAndUpdate(newOrderDetail._id,
            {$push :{customer:currentCustomer._id}},
            { new: true, useFindAndModify: false })
    }    

    res.render('customer/customerPage', { loginName: req.session.email , listBook: listBook })
}

exports.getBookDetail = async(req, res) => {
    let id = req.query.id
    let bookDetail = await book.findById(id)
    res.render('customer/bookDetail', { bookDetail: bookDetail })
}

exports.getOrderDetail = async(req, res) => {
    var currentCustomer = await customer.findOne({email: req.session.email}).populate('orderDetail')
    
    var OderDetail = await orderDetail.findOne({_id: currentCustomer.orderDetail}).populate('books')
    
    var listBookOrderDetail = OderDetail.books
    var totalPrice =0
    for(var b of listBookOrderDetail){
        totalPrice += parseFloat(b.price)*parseInt(b.quantity)
    }
    console.log(totalPrice)
    res.render('customer/orderDetail', { OderDetail: OderDetail , listBookOrderDetail: listBookOrderDetail,totalPrice:totalPrice})
}

exports.postAddtocart = async (req, res) => {
    let id = req.body.id
   
    var currentCustomer = await customer.findOne({email: req.session.email}).populate('orderDetail')
    var OderDetail = await orderDetail.findOne({_id: currentCustomer.orderDetail}).populate('books')
    let bookDetail = await book.findById(id)
    var listBookOrderDetail = OderDetail.books
    let quantityBefore = bookDetail.quantity
    var quantityForAdd = req.body.quantity
    var quantityForAddInt = parseInt(req.body.quantity)
    let flag
    if(quantityForAdd > quantityBefore){
        // Thông báo lỗi không đủ số lượng
        res.redirect('/customer/bookDetail?id='+id)
    }
    else {
        for(var idBook of listBookOrderDetail){
            if(id !=idBook._id){
            flag = false
            }
            else {
            flag =true                  
            var quantityBookOrderDetail =parseInt(idBook.quantity)+parseInt(quantityForAdd)   

            await orderDetail.findOneAndUpdate({_id:OderDetail._id,"books._id":idBook._id},
                {$set:{"books.$.quantity":quantityBookOrderDetail}},
                    { new: true, useFindAndModify: false }
                )
            break
            }
        }
        if(flag == false ||listBookOrderDetail.length<1)
            { 
                await orderDetail.findByIdAndUpdate(OderDetail._id,
                {$push :{books:{_id:id,name:bookDetail.name,price:bookDetail.price,
                    quantity:quantityForAddInt,img:bookDetail.img,description:bookDetail.description}}},
                    { new: true, useFindAndModify: false }
                )
            }  
        let quantityAfter = quantityBefore - quantityForAdd 
        await book.findByIdAndUpdate({_id: id}, {$set: {quantity: quantityAfter}})
        res.redirect('/customer/orderDetail')
        }
   
    
}
exports.getRemoveFromCart = async(req,res)=>{
    let id = req.query.id
    console.log(id)
    var currentCustomer = await customer.findOne({email: req.session.email}).populate('orderDetail')
    var OderDetail = await orderDetail.findOne({_id: currentCustomer.orderDetail}).populate('books')
    let bookDetail = await book.findById(id)

    await orderDetail.findOneAndUpdate({_id:OderDetail._id},
                {$pull:{books:{_id:id}}},
                    { new: true }
                )
    res.redirect('/customer/orderDetail')
}
//view profile
exports.getProfile = async(req,res)=>{
    let aCustomer = await customer.findOne({email : req.session.email})
    res.render('customer/customerUpdateProfile',{ aCustomer: aCustomer, loginName : req.session.email});
}

//update profile
exports.updateProfile = async(req,res)=>{
    let id = req.body.id;
    let aCustomer = await aCustomer.findById(id);
    // if (req.file) {
    //     aTrainee.img = req.file.filename;
    // }
    aCustomer.education = req.body.education;
    aCustomer = await aCustomer.save();
    res.redirect('/customer');
}