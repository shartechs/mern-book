const Book = require("../models/bookModel");
const mongoose = require("mongoose");

// Get all books
const getBooks = async (req, res) => {
  const user_id = req.user._id;
  try {
    const books = await Book.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such book found" });

  const book = await Book.findById(id);

  if (!book) return res.status(400).json({ error: "No such book found" });
  res.status(200).json(book);
};
// Add new book
const addBook = async (req, res) => {
  const { title, description, category, status } = req.body;
  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!status) {
    emptyFields.push("status");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const book = await Book.create({
      title,
      description,
      category,
      status,
      user_id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such book found" });

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) return res.status(400).json({ error: "No such book found" });
  res.status(200).json(book);
};

// Update a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such book found" });

  const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!book) return res.status(400).json({ error: "No such book found" });
  res.status(200).json(book);
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
};
