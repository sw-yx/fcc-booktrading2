const express = require('express');
const User = require('mongoose').model('User');
const Book = require('mongoose').model('Book');
const jwt = require('jsonwebtoken');
const config = require('../../config');
var Flickr = require("flickrapi"),
  flickrOptions = {
    api_key: "3391c9a4d408fa29792ae6b90cae63b3",
    secret: "10122bff46afef17"
  };

const router = new express.Router();

router.get('/photo', (req, res) => {
  console.log('hello from /photo');
  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    // we can now use "flickr" as our API object,
    // but we can only call public methods and access public data
    flickr.photos.search({text: (req.body.q ? req.body.q : "any") + "book",
      page: 1,
      per_page: 1
    }, function(err, result) {
      if(err) { throw new Error(err); }
      // do something with result
      console.log(result['photos']);
      res.status(200).json({
        message: "Retrieved book image",
        photo: result['photos']
      });
    })
  });
});
router.get('/allbooks', (req, res) => {
  Book.find({}, function(err,doc){
    if (err) console.log(err);
    res.status(200).json({
      message: "Retrieved All books",
      books: doc
    });
  })
});
router.delete('/book', (req, res) => { 
  console.log('hi'+req.body.bookid)
  Book.findOneAndRemove({_id:req.body.bookid}, function(err){
    if (err) console.log(err);
    res.status(200).json({
      message: "Deleted your book",
    });
  })
});
router.get('/book', (req, res) => { // probably wont be used as i have subsumed this into /dashboard
  Book.find({owner:req.user._id}, function(err,doc){
    if (err) console.log(err);
    res.status(200).json({
      message: "Retrieved your books",
      books: doc
    });
  })
});

router.post('/book', (req, res) => {
  var bk = new Book({title:req.body.newbook, owner:req.user._id});
  bk.save(function(err){
    if (err) console.log(err)
    res.status(200).json({
      message: "Saved " + req.body.title
    })
  })
});

router.get('/dashboard', (req, res) => {
  Book.find({owner:req.user._id}, function(err,doc){
    if (err) console.log(err);
    res.status(200).json({
      message: "You are logged in.",
      user: req.user,
      books: doc
    });
  })
});

router.post('/dashboard', (req, res) => {
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