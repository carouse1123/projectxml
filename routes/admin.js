var express = require('express');
var router = express.Router();

let monk = require('monk')
const url = 'localhost:27017/projectxml';

let db = monk(url);
let showdata =db.get('users');

/* GET home page. */
router.post('/', function(req, res, next) {
  let showdata = db.get('users');
  showdata.find({},function (err, docs){
        res.render('admin',{calldata:docs})
  })
});

module.exports = router;