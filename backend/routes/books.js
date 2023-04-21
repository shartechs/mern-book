const express = require("express");
const Book = require("../models/BookModel");

const router = express.Router();

//Get all books
router.get("/", (req, res) => {
  res.json({ msg: "get all books" });
});
// Get specific book
router.get("/:id", (req, res) => {
  res.json({ msg: "get single book" });
});
router.post("/", async (req, res) => {
  const { title, description, category, read } = req.body;
  try {
    const book = Book.create({ title, description, category, read });
    res.statusCode(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/:id", (req, res) => {
  res.json({ msg: "delete a book" });
});
router.patch("/", (req, res) => {
  res.json({ msg: "update a book" });
});

module.exports = router;
