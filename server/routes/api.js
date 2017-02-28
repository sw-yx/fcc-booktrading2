const express = require('express');
const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You are logged in.",
    user: req.user
  });
});

router.post('/dashboard', (req, res) => {

  // // get the last part from a authorization header string like "bearer token-value"
  // const token = req.headers.authorization.split(' ')[1];

  // // decode the token using a secret key-phrase
  // return jwt.verify(token, config.jwtSecret, (err, decoded) => {
  //   // the 401 code is for unauthorized status
  //   if (err) { return res.status(401).end(); }

  //   const userId = decoded.sub;

  //   // check if a user exists
  //   return User.findById(userId, (userErr, user) => {
  //     if (userErr || !user) {
  //       return res.status(401).end();
  //     } 
  //     req.user = user; // attach user object to req
  //     return next();
  //   });
  // });
  console.log('post api/dashboard',req.body);
  User.findOneAndUpdate({_id:req.user._id}, {$set:
      {city:req.body.city,
      name:req.body.name,
      state:req.body.state}
    },function(err,doc){
      if(err) console.log(err)
      res.status(200).json({
        message: "Saved new account details."
      });
    })
});

module.exports = router;