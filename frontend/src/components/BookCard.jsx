import React, { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

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
      <p>
        {" "}
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(book.createdAt), { addSuffix: true })}
      </p>
      <button className="material-symbols-outlined" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default BookCard;
