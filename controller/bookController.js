const bookDetail = require('../models/bookDetail')


exports.getBookDetail = async (req, res) => {
    res.render('bookDetail');
}