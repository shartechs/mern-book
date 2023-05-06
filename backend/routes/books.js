const express = require("express");
const {
  getBooks,
  getBook,
  addBook,
  deleteBook,
  updateBook,
} = require("../controllers/BookController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// require Auth middleware for book routes
router.use(requireAuth);

//Get all books
router.get("/", getBooks);
// Get specific book
router.get("/:id", getBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.patch("/:id", updateBook);

module.exports = router;
