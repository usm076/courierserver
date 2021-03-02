var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var registerRouter = require('./routes/register');
var dashboardData = require('./routes/dashboardDataApi');
var addPackage = require('./routes/addPackageApi');
var addPackageDimension = require('./routes/addPackageDimensionApi');
var deletePackage = require('./routes/deletePackageApi');
var deleteStaff =  require('./routes/deleteStaffApi');
var loginRouter = require('./routes/loginApi');
var addStaffRouter = require('./routes/addStaffApi');
var getPackageDataRouter = require('./routes/getPackageDataApi');
var getStaffDataRouter = require('./routes/getStaffDataApi');
var editPackageRouter = require('./routes/editPackageApi');
var trackRouter = require('./routes/trackApi');
var pdfRouter = require('./routes/pdfApi');
var editStaffRouter = require('./routes/editStaffApi');
var getProfileRouter = require('./routes/getProfileApi');
var editProfileRouter = require('./routes/editProfileApi');// // "start": "nodemon ./bin/www"
const connectDB = require('./config/db')


//MongoDB Connection
connectDB();

//var PinRouter = require('./routes/pinApi.js');
var bodyParser = require('body-parser');
const withAuth = require('./routes/middleware/jwtTokenMiddleware');

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
    'x-auth-token',
  ],
};
var app = express();
app.use(bodyParser.json()) // for parsing application/json
//app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));
//app.use(express.json());
app.use(cors(corsOpts));
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


 app.use('/register', registerRouter);
 app.use('/dashboarddata', dashboardData);
 app.use('/api/addpackage', addPackage);
 app.use('/api/addpackagedimension', addPackageDimension);
 app.use('/api/deletepackage', deletePackage);
 app.use('/api/login', loginRouter);
 app.use('/api/addstaff', addStaffRouter);
 app.use('/api/getpackagedata', getPackageDataRouter);
 app.use('/api/editpackagedata', editPackageRouter);
 app.use('/api/track', trackRouter);
 app.use('/api/generatepdf', pdfRouter);
 app.use('/api/deletestaff', deleteStaff);
 app.use('/api/getstaffdata', getStaffDataRouter);
 app.use('/api/editstaff', editStaffRouter);
 app.use('/api/getprofile', getProfileRouter);
 app.use('/api/editprofile', editProfileRouter);
 //Login


 //Signup


 // 
// app.use('/register', signupRouter);
// app.use('/signin', loginRouter);
// app.use('/verify', verifyRouter);
// app.use('/getstarted', getStartedRouter);
// app.use('/api/checkaccount', checkAccountRouter);
// app.use('/api/getData', getDataRouter);
// app.use('/api/sendcoin', sendCoinRouter);
// app.use('/api/import', importRouter);
// app.use('/api/sendpin', PinRouter);
// app.use('/api/transactions', TransactionRouter);
app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});
app.get('/', function(req, res) {
  res.send("You are in API")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
