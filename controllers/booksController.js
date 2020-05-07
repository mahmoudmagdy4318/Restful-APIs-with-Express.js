const BookModel = require("../models/bookmodel");
const mongoose = require("mongoose");
function booksController() {
  const post = (req, res) => {
    const book = new BookModel(req.body);
    if (!req.body.title) {
      res.status(403);
      res.json({ err: "title is required" });
    }
    book
      .save()
      .then((data) => {
        res.status(200);
        return res.json({ data });
      })
      .catch((err) => {
        console.log(err);
        res.status(403).json({ err });
      });
  };

  const get = (req, res) => {
    BookModel.find()
      .then((data) => {
        const books = data.map((book) => {
          let newBook = book.toJSON();
          newBook.link = `http://${req.headers.host}/book/${book._id}`;
          return newBook;
        });
        res.json({ books });
      })
      .catch((err) => {
        console.error(err);
        res.status(403).json({ err });
      });
  };

  const getOne = (req, res, next) => {
    BookModel.getBook(req.params.id)
      .then((data) => {
        req.book = data;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.status(403).json({ err });
      });
  };

  const put = (req, res) => {
    BookModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: req.body }
    )
      .then((d) => {
        res.json({ d });
      })
      .catch((err) => {
        res.status(403).json({ err });
      });
  };

  const patch = (req, res) => {
    const { book } = req;
    Object.entries(req.body).forEach((item) => {
      const [key, value] = item;
      if (key != "_id") book[key] = value;
    });
    book
      .save()
      .then((d) => {
        res.json({ d });
      })
      .catch((err) => {
        res.status(403).json({ err });
      });
  };

  return { post, get, getOne, put, patch };
}

module.exports = booksController;
