const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport
({
    service : 'gmail',
    auth :
    {
        user : process.env.email,
        pass : process.env.password
    }
});

module.exports = transporter;
// router.post('/register', [
//     check('name')
//     .not()
//     .isEmpty()
//     .withMessage('Name is required'),
//     check('email')
//     .not()
//     .isEmpty()
//     .withMessage('Email is required')
//     .isEmail()
//     .withMessage('Invalid Email')
//     .custom((value, {req}) => {
//       return new Promise((resolve, reject) => {
//         User.findOne({email:req.body.email}, function(err, user){
//           if(err) {
//             reject(new Error('Server Error'))
//           }
//           if(Boolean(user)) {
//             reject(new Error('E-mail already in use'))
//           }
//           resolve(true)
//         });
//       });
//     }),
//     // Check Password
//     check('password')
//     .not()
//     .isEmpty()
//     .withMessage('Password is required')
    
//   ], function(req, res) {
//     var name = req.body.name;
//     var email = req.body.email;
//     var password = req.body.password;
//     var confirmedPassword = req.body.confirmedPassword;

//     // Check for Errors
//     const validationErrors = validationResult(req);
//     let errors = [];
//     if(!validationErrors.isEmpty()) {
//       Object.keys(validationErrors.mapped()).forEach(field => {
//         errors.push(validationErrors.mapped()[field]['msg']);
//       });
//     }

//     if(errors.length){
//       res.render('register',{
//         errors:errors
//       });
//     }  else {
//       var newUser = new User({
//         name: name,
//         email: email,
//         password: password,
//         admin: false,
//         active: false
//       });

//       User.createUser(newUser, function (err, user) {
//         if (err) {
//           throw err;
//         }
//       });

//       req.flash('success_msg', 'You are registerd and can now login');
//       res.redirect('/users/login');
//     }