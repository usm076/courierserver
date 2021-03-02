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
var package = require('./schemas/mongo_package');

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});

router.post('/',withAuth, async function(req, res, next) {
    
    package.findById({_id : req.body.package_id}, function(error, pack)
    {
        if(pack)
        {
            res.json({
                msg : "Success",
                package : pack,
                status : 200
            })
        }
        else
        {
            res.json({
                msg : "This package doesn't exist",
                
                status : 200
            })
        }
    })

    
  })


module.exports = router;