const Account = require('../models/user');
const customer = require('../models/customer');
// const validation = require('./validation');

exports.getAdmin = async (req, res) => {
    res.render('index', { loginName: req.session.email })
}

// exports.feedbackManage = async (req, res) => {
//     res.render ('adminPage', {feedback: result,  loginName: req.session.email })
//     const result = await dbHandler.getAll("Feedback");
// }



