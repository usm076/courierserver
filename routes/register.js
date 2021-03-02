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

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});

// const User = mongoose.model('user', { name: String, email : String, pass : String, verified : Boolean });
// const EmailVerification = mongoose.model('email_verification', {user_id : String, email: String, pin : String, verified : Boolean, expiryAt : Date});


var success = 1 ;



//const transporter = require('./emailConfig');
const { response } = require('../app.js');


function passEncryptr(pass)
{
  const cryptr = new Cryptr(process.env.key);
  const encrypted = cryptr.encrypt(pass);   
  return encrypted;
}

var userid=0;
// async function validateHuman(token)
// {
//   var secret = '6LecPgoaAAAAALxrWJCTVJV-ZMLqf7UfTiV_iQDt';
//   const url = 'https://www.google.com/recaptcha/api/siteverify?secret='+secret+'&response='+token;
//   const response = await fetch(url,
//   {
//     method : "POST"
//   }
//   );
//   const data= await response.json();
//   console.log(data);
//   return data.success;
//   // console.log(url);
//   // return false;
// } 

/* GET home page. */
router.post('/', [
  body('name')
  .not()
  .isEmpty()
  .withMessage('Name is required'),
  body('email')
  .not()
  .isEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Invalid Email')
  .custom((value, {req}) => {
    return new Promise((resolve, reject) => {
      User.findOne({email:req.body.email}, function(err, user){
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
  body('pass')
  .not()
  .isEmpty(),
  body('pass').isLength({ min: 8 })
  .withMessage('Password must be of 8 digits')
  
  
], async function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.send(errors.array());
    
  }
  
  console.log(req.body)
  const pass = passEncryptr(req.body.pass);
  var pin = Math.floor(Math.random() * (99999 - 10000) ) + 10000;


  //Email Sending
  try {
    

    
            var dt = new Date();
            dt.setHours( dt.getHours() + 2 );

           await User.create({
            name: req.body.name,
            pass: req.body.pass,
            email : req.body.email,
            role : 0
            }).then((user)=>{
                const payload =  user.id;
                jwt.sign(payload, "usman123", {
                // expiresIn : 3600

                },
                (error, token) => {
                if(error) throw error;
                res.json({
                token, 
                proceed : 0,
                status : 200,
                })
                }
                )
            })
       
     
  } catch (error) {
    console.log('Sign up failed 1');
        success =1;
  }

  
//res.json({email : 0, id : user._id})
  
  
  })
  function setUserid(id)
  {
    console.log("in setid function")
    userid = id;
  }
  function getUserid()
  {
    console.log("in getid function")
    return userid;
  }


module.exports = router;