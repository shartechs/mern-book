import React from "react";

const BookCard = ({ book }) => {
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
    </div>
  );
};

export default BookCard;
