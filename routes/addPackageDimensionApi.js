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

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});


var success = 1 ;



//p_actualWeight : 0,
// p_chargeableWeight : 0,




var userid=0;

/* GET home page. */
router.post('/', async function(req, res, next) {

  const chargeable = (req.body.height*req.body.width*req.body.length)/5000;
  console.log(req.body);
  console.log(chargeable);
  package.updateOne({_id: req.body.package_id},{p_height : req.body.height, p_width :  req.body.width, p_length :  req.body.length, p_chargeableWeight : chargeable }, function(error, pack){
    if(pack)
    {
        res.json({
            msg :"Added successfully",
            status : 200
        })
    }
    else
    {
        res.json({
            msg :error,
            status : 200
        })
    }
  })
//   date = new Date();
//   package.create({
//     r_name : req.body.r_name,
//     r_nationalId : req.body.r_nID,
//     r_address : req.body.r_address, 
//     r_contact : req.body.r_contact,
//     s_name : req.body.s_name,
//     s_nationalId : req.body.s_nID, 
//     s_address : req.body.s_address, 
//     s_contact : req.body.s_contact,
//     status : "Pending",
//     p_length :0 ,
//     p_height : 0,
//     p_width : 0,
//     createdOn : new Date()
//   }).then((pack)=>{
//     res.json({
//       status : 200,
//       msg : "Added successfully"
//     })
//   })
  //res.send(req.body);
  //res.sendStatus(200);
  
  
 

  

  
  
  })


module.exports = router;