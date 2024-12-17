import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route for save a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Missing required fields" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    publishYear: req.body.publishYear,
  });

  const book = await Book.create(newBook);

  res.status(201).send(book);
});

// Route for get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for get a book by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// Route for delete a book
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

export default router;
