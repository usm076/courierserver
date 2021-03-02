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








var userid=0;

/* GET home page. */
router.post('/',withAuth, async function(req, res, next) {

  package.find({}, function(error, packages)
  {
    if(error)
    {
      console.log("This is error :" ,error);
    }
    else
    {
      package.countDocuments({status : "Pending"}, function(err, pendingCount){
        package.countDocuments({status : "Delivered"}, function(deliveredError, deliveredCount){
          package.countDocuments({}, function(totalError, totalCount){
            User.findById({_id : req.jwtId}, function(userError, userRole)
            {
              if(userRole){
              if(userRole.role == 0)
              {
                User.find({role : 1}, function(StaffError, StaffData)
                {
                  if(StaffData)
                  {
                
                res.json({
                  isAdmin : true,
                  pCount : pendingCount,
                  dCount : deliveredCount,
                  tCount : totalCount,
                  status : 200,
                   packages,
                   StaffData
                })
              }
              else
              {
                res.json({
                  msg : "There is error in staff api"+StaffError,
                  status : 200
                })
              }
              })
              }
              else
              {
                res.json({
                  isAdmin : false,
                  pCount : pendingCount,
                  dCount : deliveredCount,
                  tCount : totalCount,
                  status : 200,
                   packages
                })
              }
            }
            })
            

          })
        })
      })

     
      
    }
  })
  //res.send(req.jwtId);
  //res.sendStatus(200);
  

 

  

  
  
  })


module.exports = router;