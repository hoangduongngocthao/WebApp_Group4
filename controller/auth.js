const Account = require('../models/user');
const customer = require('../models/customer');
const bookDetail = require('../models/bookDetail')
const bcrypt = require('bcryptjs');

exports.handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let books = [];
    try {
        let user = await Account.findOne({ email: username });
        if (user.Role == 'customer') {
            let aCustomer = await customer.findOne({ email: username });
            books = bookDetail.find({ customer: aCustomer.name });
            console.log(books);
        }
        await bcrypt.compare(password, user.password).then((doMatch) => {
            if (doMatch) {
                if (user.Role == 'customer') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.staff = true;
                    res.redirect('/customer');
                }
                else if (user.Role == 'admin') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.admin = true;
                    res.redirect('/admin');
                }
            } else {
                return res.render('index', { errors: 'Username or password is incorrect' })
            }

        })
            // .catch(err => {
            //     console.log(err)
            // })
    } catch (error) {
        //console.log(error);
        //return res.render('index');
    }
};

exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}