const express = require('express');
const router = express.Router();

let monk = require('monk')
const url = 'localhost:27017/projectxml';

let db = monk(url);
let data = db.get('users');

const  ObjectID = require('mongodb').ObjectId;
/* GET home page. */


const isLoggedout = (req, res, next) => {
    try {
        req.session.destroy();
        res.redirect('/admin');
    }
    catch(error){
        res.redirect('/admin');
    }
    next()
}


router.post('/adminlogin',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    
    const user = await data.findOne({
      email
    });
  
    if (user) {
        if(password == user.password){
            req.session.user = user;
            return res.render('admin',{user})
        } else {
            return res.render('adminlogin', { message: ' Password incorrect' });
        }
       
        
    } else {
      return res.render('adminlogin', { message: 'Email incorrect' });
    }
    
});

// logout
router.get('/logout',isLoggedout, function(req, res, next) {
    res.render('adminlogin')
});
// ninecommon

let ninecommon = db.get('ninecommon');
router.get('/ninecommon/insert', function(req, res, next){
    res.render('insert');
});

router.get('/ninecommon', function(req, res, next){
    let showdata = db.get('ninecommon');
    showdata.find({},function (err, docs){
        res.render('ninecommon',{calldata:docs});
    })
    
});

router.post('/ninecommon/insert', function(req, res, next){
    ninecommon.insert({
        name:req.body.name,
        number:req.body.number,
        year:req.body.year,
        file:req.body.file
    })
    res.redirect('/auth/ninecommon');
});

//delete

router.get('/ninecommon/delete/:id', function(req, res, next){
    ninecommon.remove({_id:req.params.id});
    res.redirect('/auth/ninecommon');
});

//update

router.post('/ninecommon/update', async (req, res, next) =>{
    await ninecommon.update(
        {_id: ObjectID(req.body._id)},
        {
            $set:{'name':req.body.name,'number':req.body.number,'year':req.body.year,'file':req.body.file}
        });
res.redirect('/auth/ninecommon');
});

router.get('/ninecommon/update/:id', function(req, res, next){
    ninecommon.find({_id:req.params.id},function(err, docs){
    res.render('ninecommonupdate',{calldata:docs});
});

});

//netsat

let netsat = db.get('netsat');
router.get('/netsat/insert', function(req, res, next){
    res.render('netsatinsert');
});

router.get('/netsat', function(req, res, next){
    let showdata = db.get('netsat');
    showdata.find({},function (err, docs){
        res.render('netsat',{calldata:docs});
    })
    
});

router.post('/netsat/insert', function(req, res, next){
    netsat.insert({
        name:req.body.name,
        number:req.body.number,
        year:req.body.year,
        file:req.body.file
    })
    res.redirect('/auth/netsat');
});

//delete

router.get('/netsat/delete/:id', function(req, res, next){
    netsat.remove({_id:req.params.id});
    res.redirect('/auth/netsat');
});

//update

router.post('/netsat/update', async (req, res, next) =>{
    await netsat.update(
        {_id: ObjectID(req.body._id)},
        {
            $set:{'name':req.body.name,'number':req.body.number,'year':req.body.year,'file':req.body.file}
        });
res.redirect('/auth/netsat');
});

router.get('/netsat/update/:id', function(req, res, next){
    netsat.find({_id:req.params.id},function(err, docs){
    res.render('netsatupdate',{calldata:docs});
});

});

//gatpat

let gatpat = db.get('gatpat');
router.get('/gatpat/insert', function(req, res, next){
    res.render('gatpatinsert');
});



router.get('/gatpat', function(req, res, next){
    let showdata = db.get('gatpat');
    showdata.find({},function (err, docs){
        res.render('gatpat',{calldata:docs});
    })
    
});

router.post('/gatpat/insert', function(req, res, next){
    gatpat.insert({
        name:req.body.name,
        number:req.body.number,
        year:req.body.year,
        file:req.body.file
    })
    res.redirect('/auth/gatpat');
});

//delete

router.get('/gatpat/delete/:id', function(req, res, next){
    gatpat.remove({_id:req.params.id});
    res.redirect('/auth/gatpat');
});

//update

router.post('/gatpat/update', async (req, res, next) =>{
        await gatpat.update(
            {_id: ObjectID(req.body._id)},
            {
                $set:{'name':req.body.name,'number':req.body.number,'year':req.body.year,'file':req.body.file}
            });
    res.redirect('/auth/gatpat');
});

router.get('/gatpat/update/:id', function(req, res, next){
    gatpat.find({_id:req.params.id},function(err, docs){
        res.render('gatpatupdate',{calldata:docs});
    });
    
});

//major
router.get('/addmin_major', function(req, res, next) {
    res.render('addmin_major');
  });
  router.get('/addmin_major/addmin_major_ams_it', function(req, res, next) {
    res.render('addmin_major_ams_it');
  });
  router.get('/addmin_major/addmin_major_ams_gis', function(req, res, next) {
    res.render('addmin_major_ams_gis');
  });
  router.get('/addmin_major/addmin_major_ams_cs', function(req, res, next) {
    res.render('addmin_major_ams_cs');
  });

module.exports = router;