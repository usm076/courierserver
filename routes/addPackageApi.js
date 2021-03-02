var express = require('express');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch')
//const mongodb = require('mongodb');
var router = express.Router();
var Cryptr = require('cryptr');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
var User = require('./schemas/mongo_users');
var package = require('./schemas/mongo_package');
dotenv.config();
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware/jwtTokenMiddleware');

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});


var success = 1 ;




//



var userid=0;

/* GET home page. */
router.post('/', withAuth, async function(req, res, next) {
  package.findOne({}, {}, { sort: { 'createdOn' : -1 } }, function(err, latestPackage) {
    //console.log( latestPackage.packID );
    if(latestPackage != null){
    var idd = latestPackage.packID+1;
  
  
  console.log(req.body);
  date = new Date();
  package.create({
    packID : idd,
    r_name : req.body.r_name,
    r_country : req.body.r_country,
    r_nationalId : req.body.r_nID,
    r_address : req.body.r_address, 
    r_contact : req.body.r_contact,
    s_name : req.body.s_name,
    s_nationalId : req.body.s_nID, 
    s_country : req.body.s_country,
    s_address : req.body.s_address, 
    s_contact : req.body.s_contact,
    status : "Pending",
    p_length :0 ,
    p_height : 0,
    p_width : 0,
    p_actualWeight : req.body.p_weight,
    createdOn : new Date()
  }).then((pack)=>{
    res.json({
      status : 200,
      msg : "Added successfully"
    })
  })
}
else
{
  date = new Date();
  package.create({
    packID : 1000001,
    r_name : req.body.r_name,
    r_nationalId : req.body.r_nID,
    r_address : req.body.r_address, 
    r_contact : req.body.r_contact,
    s_country : req.body.s_country,
    r_country : req.body.r_country,
    s_name : req.body.s_name,
    s_nationalId : req.body.s_nID, 
    s_address : req.body.s_address, 
    s_contact : req.body.s_contact,
    status : "Pending",
    p_length :0 ,
    p_height : 0,
    p_width : 0,
    p_actualWeight : req.body.p_weight,
    createdOn : new Date()
  }).then((pack)=>{
    // package.updateOne({_id : pack.id},{packID : })
    res.json({
      status : 200,
      msg : "Added successfully"
    })
  })
}

});
  //res.send(req.body);
  
  
 

  

  
  
  })


module.exports = router;