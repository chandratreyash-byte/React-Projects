const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  image:{
    path: { type: String },
    filename: { type: String }
  },
  price: Number,
  stock: Number,
  status: String,
}

)

const Book = mongoose.model('Book',BookSchema);

module.exports=Book