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

// exports.feedbackManage = async (req, res) => {
//     res.render ('adminPage', {feedback: result,  loginName: req.session.email })
//     const result = await dbHandler.getAll("Feedback");
// }

exports.postRegisterAccount = async(req, res) => {
    const nameInput = req.body.username;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    const educationInput = req.body.education;
    let account = await user.findOne({email: emailInput})
    console.log(nameInput)
    console.log(emailInput)
    console.log(passwordInput)
    console.log(educationInput)

    console.log('aaaa' + account + '\n');   
    let newCustomer = new customer ({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        education: educationInput
        
    });
    console.log(newCustomer);
    if(account == null) {
    newCustomer = await newCustomer.save();
    
        let newUser = new user({
            email:emailInput,
            password:passwordInput,
            Role: "customer"
        })
        newUser = await newUser.save();
    }
    res.redirect('/admin')
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

exports.doAddCustomer = async (req, res) => {
    let newCustomer;
    if (req.file) {
        newCustomer = new customer({
            name: req.body.name,
            email: req.body.email,
            education: req.body.education,
            img: req.file.filename
        });
        newCustomer = await newCustomer.save()
    } else {
        newCustomer = new customer({
            name: req.body.name,
            email: req.body.email,
            education: req.body.education
        });
        newCustomer = await newCustomer.save()
    }
    res.redirect('adminViewCustomer');
}

exports.editCustomer = async (req, res) => {
    let id = req.query.id;
    console.log(id)
    let customerEdit = await customer.findById(id);
    console.log(customerEdit);
    res.render('admin/adminEditCustomer', { listCustomer: customerEdit, loginName: req.session.email })
}

exports.doEditCustomer = async (req, res) => {
    let id = req.body.id;
    let listCustomer = await customer.findById(id);
    // if (req.file) {
    //     listCustomer.img = req.file.filename;
    // }
    listCustomer.name = req.body.name;
    listCustomer.education = req.body.education;
    try {
        listCustomer = await listCustomer.save();
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
    let newBook = await book({
        name: name, 
        description: description, 
        price: price, 
        quantity: quantity
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


