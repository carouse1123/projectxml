var express = require('express');
var router = express.Router();

let monk = require('monk');
const url = 'localhost:27017/projectxml';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/major', function(req, res, next) {
  res.render('major');
});
router.get('/major/major_ams_it', function(req, res, next) {
  res.render('major_ams_it');
});
router.get('/major/major_ams_gis', function(req, res, next) {
  res.render('major_ams_gis');
});
router.get('/major/major_ams_cs', function(req, res, next) {
  res.render('major_ams_cs');
});

module.exports = router;
