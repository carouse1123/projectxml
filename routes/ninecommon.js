var express = require('express');
var router = express.Router();

let monk = require('monk');
const url = 'localhost:27017/projectxml';
let db = monk(url);

/* GET home page. */
router.get('/', (req, res, next) =>{
    let calldata = db.get('ninecommon');
    calldata.find({},function(err,docs){
        res.render('ninecommonv',{calldata:docs});
    })
});


module.exports = router;