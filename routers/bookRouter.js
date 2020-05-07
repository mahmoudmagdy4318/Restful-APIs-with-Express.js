const express = require("express");
const app = express();
const BookModel = require("../models/bookmodel");
const mongoose = require("mongoose");
const booksController = require("../controllers/booksController");
const booksControl = booksController();

BookRouter = express.Router();

BookRouter.get("/", (req, res) => {
  booksControl.get(req, res);
});

BookRouter.post("/", (req, res) => {
  booksControl.post(req, res);
});

BookRouter.use("/:id", (req, res, next) => {
  booksControl.getOne(req, res, next);
});

BookRouter.get("/:id", (req, res) => {
  res.json({ book: req.book });
});

BookRouter.put("/:id", (req, res) => {
  booksControl.put(req, res);
});

BookRouter.patch("/:id", (req, res) => {
  booksControl.patch(req, res);
});

BookRouter.delete("/:id", (req, res) => {
  const { book } = req;
  book
    .remove()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(403).json({ err });
    });
});

module.exports = BookRouter;
