const Account = require('../models/user');
const customer = require('../models/customer');
// const bcrypt = require('bcryptjs');

exports.handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        // console.log(user)
        let user = await Account.findOne({ email: username });
        if (user.password == password){
            if (user.Role == 'customer') {
                req.session.user = user;
                req.session.email = username;
                req.session.customer = true;
                res.redirect('/customer');
            }
            else if (user.Role == 'admin') {
                    req.session.user = user;
                    req.session.email = username;
                    req.session.admin = true;
                    res.redirect('/admin');
                }
        }
        // console.log(user)
        // console.log(password)
        // Account.compare(password, user.password).then((doMatch) => {
        //     console.log('aaaaaaa')
        //     if (doMatch) {
        //         if (user.Role == 'customer') {
        //             console.log('aaaa')
        //             req.session.user = user;
        //             req.session.email = username;
        //             req.session.customer = true;
        //             res.redirect('/customer');
        //         }
        //         else if (user.Role == 'admin') {
        //             req.session.user = user;
        //             req.session.email = username;
        //             req.session.admin = true;
        //             res.redirect('/admin');
        //         }
        //     } else {
        //         return res.render('login', { errors: 'Username or password is incorrect' })
        //     }

        // })
            // .catch(err => {
            //     console.log(err)
            // })
    } catch (error) {
        console.log(error);
        //return res.render('index');
    }
};

exports.handleLogout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.getLogin = async (req, res) => {
    res.render('login');
}