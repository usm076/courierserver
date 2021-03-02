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
router.post('/', async function(req, res, next) {
    console.log(req.body.track);//.status != null
    var tra = req.body.track;

  package.findOne({ packID : tra}, function(error, pack)
  {
    if(pack)
    {
        console.log("This is package : ", pack);
        res.json({
            status : 200,
            packStatus : pack.status
        })
    }
    else if(error)
    {
        console.log("This is Error : ", error);
        res.json({
            status : 200,
            packStatus : "Package not found. Try again soon !"
        })
    }
    else
    {   
        res.json({
            status : 200,
            packStatus : "Package not found. Try again soon !"
        })

    }
  })
  //res.send(req.jwtId);
  //res.sendStatus(200);
  

 

  

  
  
  })


module.exports = router;