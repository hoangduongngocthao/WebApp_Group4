const Account = require('../models/user');
const customer = require('../models/customer');
// const validation = require('./validation');
const bookDetail = require('../models/bookDetail');

exports.getAdmin = async (req, res) => {
    res.render('admin', { loginName: req.session.email })
}

// exports.feedbackManage = async (req, res) => {
//     res.render ('adminPage', {feedback: result,  loginName: req.session.email })
//     const result = await dbHandler.getAll("Feedback");
// }




module.exports = router;
