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








var userid=0;

/* GET home page. */
router.post('/', [
  body('profileName')
  .not()
  .isEmpty()
  .withMessage('Name is required'),
  // body('profileEmail')
  // .not()
  // .isEmpty()
  // .withMessage('Email is required')
  // .isEmail()
  // .withMessage('Invalid Email')
  // .custom((value, {req}) => {
  //   return new Promise((resolve, reject) => {
  //     User.findOne({email:req.body.email}, function(err, user){
  //       if(err) {
  //         reject(new Error('Server Error'))
  //       }
  //       if(Boolean(user)) {
  //         reject(new Error('E-mail already in use'))
  //       }
  //       resolve(true)
  //     });
  //   });
  // }),
  // Check Password
  body('profilePass')
  .not()
  .isEmpty(),
  body('profilePass').isLength({ min: 8 })
  .withMessage('Password must be of 8 digits')]
  
 , withAuth, async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.send(errors.array());
    
  }

  
  console.log(req.body);
  User.updateOne({_id: req.jwtId},{
    name : req.body.profileName,
    email : req.body.profileEmail,
    pass : req.body.profilePass
     // p_height : req.body.height, p_width :  req.body.width, p_length :  req.body.length 
    }, function(error, profile){
    if(profile)
    {
        console.log(profile);
        res.json({
            msg :"Updated successfully",
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

 

  

  
  
  })


module.exports = router;