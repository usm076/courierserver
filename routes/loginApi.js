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

router.post('/',[
    
    body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email')
    ,
    // Check Password
    body('pass')
    .not()
    .isEmpty(),
    body('pass').isLength({ min: 8 })
    .withMessage('Password must be of 8 digits')
    
    
  ], async function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // sendErrorResponse();
      function sendErrorResponse(){
        res.json({
                      
          proceed : 1,
          msg : "Invalid Format",
          status :200
          
        })
      }
      // console.log(errors.array());
      // return res.send(errors.array());
      
    }
    User.findOne({email : req.body.email, pass : req.body.pass}, function(error, found)
    {
      if(found){
        const payload =  found.id;
                jwt.sign(payload, "usman123", {
                // expiresIn : 3600

                },
                (error, token) => {
                if(error) throw error;
                res.json({
                  proceed : 0,
                token, 
                status : 200,
                })
                }
                )
              }
              else
              {
                res.json({
                  
                  proceed : 1,
                  msg : "Invalid Credentials",
                  status :200
                  
                })
                
              }
    })

    // function sendErrorResponse(){
    //   res.json({
                    
    //     proceed : 1,
    //     msg : "Invalid Credentials",
    //     status :200
        
    //   })
    // }
  })
  


module.exports = router;