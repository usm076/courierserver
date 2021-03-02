const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
 // console.log(req.headers.x-auth-token);
  const authToken=req.header('x-auth-token');
  //console.log(req);
  //const token = req.cookies.jwttoken;
 // console.log(res.cookies.token);
  if (!authToken) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(authToken, "usman123", function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
       // console.log("This is decoded data "+decoded);
      // res.locals.userid=decoded;
        req.jwtId = decoded;
        next();
      }
    });
  }
}
module.exports = withAuth;