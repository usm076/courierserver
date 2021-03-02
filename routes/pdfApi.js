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
const fs = require("fs");
const path = require("path");

var pdf = require("pdf-creator-node");

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/courier', {useNewUrlParser: true, useUnifiedTopology: true});

var success = 1 ;
var userid=0;
/* GET home page. */
router.post('/', async function(req, res, next) {
    console.log(req.body);//.status != null
   // var tra = req.body.track;

  package.findOne({ _id : req.body.pid}, function(error, pack)
  {
    if(pack)
    {
        const data = {
            packID : pack.packID,
            s_name : pack.s_name,
            s_contact : pack.s_contact,
            s_country : pack.s_country,
            r_name : pack.r_name,
            r_contact : pack.r_contact,
            r_country : pack.r_country,
            p_actualWeight : pack.p_actualWeight,
            p_chargeableWeight : pack.p_chargeableWeight,
            s_address : pack.s_address,
            r_address : pack.r_address,
            s_nationalId : pack.s_nationalId,
            r_nationalId : pack.r_nationalId,
            p_length : pack.p_length,
            p_width : pack.p_width,
            p_height : pack.p_height
        }
        
        // console.log("This is package : ", pack);
        createPdf(data);
        res.json({
            status : 200,
            msg : "Downloaded"
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
    
  })
  
  
  })
  async function createPdf(data)
  {
    var templateHtml = fs.readFileSync(path.join(process.cwd(), '/routes/pdftemplate.html'), 'utf8');
    // var html = fs.readFileSync(path.join(process.cwd(),'/routes/pdftemplate.html'), 'utf8');

    //console.log(templateHtml);
	
    // // console.log(html);

	

	var pdfPath = path.join('pdf', `${data.packID}.pdf`);
    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm"
        // header: {
        //     height: "45mm",
        //     contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
        // },
        // "footer": {
        //     "height": "28mm",
        //     "contents": {
        //     first: 'Cover page',
        //     2: 'Second page', // Any page number is working. 1-based index
        //     default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //     last: 'Last Page'
        // }
    }

    var document = {
        html: templateHtml,
        data : data,
        // data: {
        //     data: data
        // },
        path: pdfPath
    };

    pdf.create(document, options)
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.error(error)
    });















    //OLD method starts here
	// var options = {
	// 	width: '1230px',
	// 	headerTemplate: "<p></p>",
	// 	footerTemplate: "<p></p>",
	// 	displayHeaderFooter: false,
	// 	margin: {
	// 		top: "10px",
	// 		bottom: "30px"
	// 	},
	// 	printBackground: true,
    //     // backgroundPicture : 'background1.jpg',
	// 	path: pdfPath
	// }

	// const browser = await puppeteer.launch({
	// 	args: ['--no-sandbox'],
	// 	headless: true
	// });

	// var page = await browser.newPage();
	
	// await page.goto(`data:text/html;charset=UTF-8,${html}`, {
	// 	waitUntil: 'networkidle0'
	// });

	// await page.pdf(options);
	// await browser.close();
  }
module.exports = router;