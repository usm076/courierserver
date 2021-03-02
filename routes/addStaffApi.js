var express = require('express');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch')
//const mongodb = require('mongodb');
var router = express.Router();
var Cryptr = require('cryptr');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
var User = require('./schemas/mongo_users');
//var EmailVerification = require('./schemas/mongo_package');
dotenv.config();
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware/jwtTokenMiddleware');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});

// const User = mongoose.model('user', { name: String, email : String, pass : String, verified : Boolean });
// const EmailVerification = mongoose.model('email_verification', {user_id : String, email: String, pin : String, verified : Boolean, expiryAt : Date});


var success = 1;



//const transporter = require('./emailConfig');
const { response } = require('../app.js');


function passEncryptr(pass)
{
  const cryptr = new Cryptr(process.env.key);
  const encrypted = cryptr.encrypt(pass);   
  return encrypted;
}

var userid=0;

router.post('/',withAuth,  [
  body('staffName')
  .not()
  .isEmpty()
  .withMessage('Name is required'),
  body('staffEmail')
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid Email')
  .custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      User.findOne({email:req.body.staffEmail}, function(err, user){
        if(err) {
          reject(new Error('Server Error'))
        }
        if(Boolean(user)) {
          reject(new Error('E-mail already in use'))
        }
        resolve(true)
      });
    });
  }),
  // Check Password
  body('staffPass')
  .not()
  .isEmpty(),
  body('staffPass').isLength({ min: 8 })
  .withMessage('Password must be of 8 digits')
  
  
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.send(errors.array());
    
  }
  
  console.log(req.body)
 

  User.findById({_id : req.jwtId}, async function(error, user){
      if(user){
    if(user.role == 0){

  //Email Sending
  try {
    

    
            var dt = new Date();
            dt.setHours( dt.getHours() + 2 );

           await User.create({
            name: req.body.staffName,
            pass: req.body.staffPass,
            email : req.body.staffEmail,
            role : 1
            }).then((user)=>{
                res.json({
                    msg : "Staff added successfully",
                    status : 200
                })
            })
       
     
  } catch (error) {
    console.log('Sign up failed 1');
        //success =1;
  }
}
else
{
    res.json({
        msg : "Only admin can add staff",
        status : 200
    })
}
      }
      else
      {
          console.log(error);
          res.sendStatus(401);
      }

})
  
//res.json({email : 0, id : user._id})
  
  
  })
  


module.exports = router;