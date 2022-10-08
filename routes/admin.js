var express = require('express');
var router = express.Router();

let monk = require('monk')
const url = 'localhost:27017/projectxml';

let db = monk(url);
let admins =db.get('users');
let storage = db.get('Ex_storage');

const isLoggedin = (req, res, next) => {
    if (!req.session.user){
        res.redirect('/admin/adminlogin')
    }
    next()
}



/* GET home page. */
router.get('/',isLoggedin, function(req, res, next) {
        res.render('admin',{user: req.session.user})
});

router.get('/adminlogin', function(req, res, next){
    res.render('adminlogin');
});


module.exports = router;