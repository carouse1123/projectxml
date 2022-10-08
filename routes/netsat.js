var express = require('express');
var router = express.Router();

let monk = require('monk');
const url = 'localhost:27017/projectxml';
let db = monk(url);

/* GET home page. */
router.get('/', (req, res, next) =>{
    let calldata = db.get('netsat');
    calldata.find({},function(err,docs){
        res.render('netsatv',{calldata:docs});
    })
});


module.exports = router;