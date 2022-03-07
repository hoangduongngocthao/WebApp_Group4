const user = require('../models/user');
const customer = require('../models/customer');
const book = require('../models/book');
// const validation = require('./validation');

exports.getAdmin = async (req, res) => {
    var listBook = await book.find()
    res.render('admin/adminPage', { loginName: req.session.email, listBook: listBook })
}

exports.getRegisterAccount = async (req, res) => {
    res.render('admin/registerAccount', { loginName: req.session.email })
}

exports.postRegisterAccount = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const education = req.body.education;
    let account = await user.findOne({email: email})
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(education)
    console.log('aaaa' + account + '\n');   
    let newCustomer = new customer ({
        name: name,
        email: email,
        password: password,
        education: education
    });
    console.log(newCustomer);
    if(account == null) {
    newCustomer = await newCustomer.save();
    
        let newUser = new user({
            email:email,
            password:password,
            Role: "customer"
        })
        newUser = await newUser.save();
    }
    res.redirect('/customer')
}

// ------------------------Customer--------------------------------
// ----------------------------------------------------------------

//view all Account
exports.viewAllAccount = async (req, res) => {
    let listCustomer = await customer.find();
    res.render('admin/adminViewCustomer', { listCustomer: listCustomer, loginName: req.session.email })
}

exports.addCustomer = async (req, res) => {
    res.render('admin/adminAddCustomer', { loginName: req.session.email });
}

exports.postDoAddCustomer = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const education = req.body.education;
    let account = await user.findOne({email: email})
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(education)
    console.log('aaaa' + account + '\n');   
    let newCustomer = new customer ({
        name: name,
        email: email,
        password: password,
        education: education
    });
    console.log(newCustomer);
    if(account == null) {
    newCustomer = await newCustomer.save();
    
        let newUser = new user({
            email:email,
            password:password,
            Role: "customer"
        })
        newUser = await newUser.save();
    }
    res.redirect('adminViewCustomer')
}

exports.editCustomer = async (req, res) => {
    let id = req.query.id;
    console.log(id)
    let customerEdit = await customer.findById(id);
    console.log(customerEdit);
    res.render('admin/adminEditCustomer', { listCustomer: customerEdit, loginName: req.session.email })
}

exports.postDoEditCustomer = async (req, res) => {
    let id = req.body.id;
    let detailCustomer = await customer.findById(id);

    detailCustomer.name = req.body.name;
    detailCustomer.education = req.body.education;
    detailCustomer.img = req.file.path;
    try {
        detailCustomer = await detailCustomer.save();
        res.redirect('adminViewCustomer');
    }
    catch (error) {
        console.log()
        res.redirect('adminViewCustomer');
    }
}

exports.doDeleteCustomer = async (req, res) => {
    let id = req.query.id;
    await customer.findByIdAndRemove(id);
    res.redirect('/admin/adminViewCustomer');
}

// Search Customer
exports.doSearchCustomer = async (req, res) => {
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText, 'i');
    let listCustomer = await customer.find({ name: searchCondition });
    console.log(listCustomer);
    res.render('admin/adminViewCustomer', { listCustomer: listCustomer, loginName: req.session.email });
}


// ------------------------Book--------------------------------
// ----------------------------------------------------------------

//Book Admin
exports.getBookDetail = async(req, res) => {
    let id = req.query.id
    let bookDetail = await book.findById(id)
    res.render('admin/adminBookDetail', { bookDetail: bookDetail })
}

//view book
exports.viewAddBook = async (req, res) => {
    let Books = await book.find();
    res.render('admin/adminAddBook',{ Books: Books, loginName: req.session.email })
}

// add Book
exports.addBook = async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let img = req.file.path;
    console.log(req.file)

    let newBook = await book({
        name: name, 
        description: description, 
        price: price, 
        quantity: quantity,
        img: img
    })
    try {
        newBook = await newBook.save();
    }
    catch (error) {
        console.log(error);
    }
    res.redirect('/admin');
}

// Click Edit Book
exports.editBook = async (req, res) => {
    let id = req.query.id;
    console.log('ID: ' + id);
    let Books = await book.findById(id);
    //console.log(book);
    res.render('admin/adminEditBook', { Books: Books, loginName: req.session.email })
}

// Do Edit Book 
exports.doEditBook = async (req, res) => {
    let id = req.body.id;
    let Books = await book.findById(id);
    Books.name = req.body.name;
    Books.description = req.body.description;
    Books.price = req.body.price;
    Books.quantity = req.body.quantity;
    Books.img = req.file.path
    try {
        Books = await Books.save();
        res.redirect('/admin');
    }
    catch (error) {
        console.log(error);
        res.redirect('/admin');
    }
}

// Delete Book
exports.doDeleteBook = async (req, res) => {
    let id = req.query.id;
    await book.findByIdAndRemove(id).then(data = {});
    res.redirect('/admin');
}


// Search Book
exports.doSearchBook = async (req, res) => {
    const searchText = req.body.keyword;
    console.log(searchText);
    const searchCondition = new RegExp(searchText, 'i');
    let listBook = await book.find({ name: searchCondition });
    console.log(listBook);
    res.render('admin/adminPage', { listBook: listBook, loginName: req.session.email });
}
