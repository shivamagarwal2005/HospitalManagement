const express = require("express");
const router = express.Router();

const Book = require("../models/book");


// GET all books
router.get("/books", async (req, res) => {
  try {

    const books = await Book.find();

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});


// SEARCH book by title or author
router.get("/books/search", async (req, res) => {

  try {

    const { title, author } = req.query;

    if (!title && !author) {
      return res.status(400).json({
        message: "Provide title or author to search"
      });
    }

    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

    const books = await Book.find(query);

    if (books.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(books);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// GET book by ID
router.get("/books/:id", async (req, res) => {

  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// ADD new book
router.post("/books", async (req, res) => {

  try {

    const book = new Book(req.body);

    await book.save();

    res.status(201).json(book);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }

});


// UPDATE book
router.put("/books/:id", async (req, res) => {

  try {

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// DELETE book
router.delete("/books/:id", async (req, res) => {

  try {

    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book record deleted",
      book: deletedBook
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;