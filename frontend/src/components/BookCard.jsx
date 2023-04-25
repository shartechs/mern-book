import React, { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

const BookCard = ({ book }) => {
  const { dispatch } = useContext(BooksContext);
  const onDelete = async () => {
    const response = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
    });
    const deletedBook = await response.json();
    try {
      dispatch({ type: "DELETE_BOOK", payload: deletedBook });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="book-card">
      <h4>{book.title}</h4>
      <p>
        <strong>Category: </strong>
        {book.category}
      </p>
      <p>
        <strong>Description: </strong>
        {book.description}
      </p>
      <p>
        <strong>status: </strong>
        {book.status}
      </p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BookCard;
