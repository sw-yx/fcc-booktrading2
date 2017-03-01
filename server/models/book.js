const mongoose = require('mongoose');

// define the User model schema
const BookSchema = new mongoose.Schema({
  title: String,
  owner: String,
  wanters: [String]
});



module.exports = mongoose.model('Book', BookSchema);