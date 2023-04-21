const express = require("express");
const {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/BookController");

const router = express.Router();

//Get all books
router.get("/", getBooks);
// Get specific book
router.get("/:id", getBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

module.exports = router;
