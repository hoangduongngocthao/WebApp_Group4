const user = require('../models/user');
const customer = require('../models/customer');
// const validation = require('./validation');

exports.getAdmin = async (req, res) => {
    res.render('admin/adminPage', { loginName: req.session.email })
}

exports.getRegisterAccount = async (req, res) => {
    res.render('admin/registerAccount', { loginName: req.session.email })
}

// exports.feedbackManage = async (req, res) => {
//     res.render ('adminPage', {feedback: result,  loginName: req.session.email })
//     const result = await dbHandler.getAll("Feedback");
// }

exports.postRegisterAccount = async(req, res) => {
    const nameInput = req.body.txtName;
    const emailInput = req.body.txtEmail;
    const passwordInput = req.body.txtPassword;
    const educationInput = req.body.txtEducation;
    let account = await user.findOne({email: emailInput})

    console.log(account);   
    let newCustomer = new customer ({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        education: educationInput
        
    });
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

