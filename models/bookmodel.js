const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

//static method to get specific book
BookModel.statics.getBook = function (id) {
  return this.findById(mongoose.Types.ObjectId(id));
};
module.exports = mongoose.model("Book", BookModel);
