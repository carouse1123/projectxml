var express = require('express');
var router = express.Router();

let monk = require('monk')
const url = 'localhost:27017/projectxml';

let db = monk(url);
let showdata =db.get('users');

/* GET home page. */


module.exports = router;