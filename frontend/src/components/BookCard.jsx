import React, { useContext, useState } from "react";
import { BooksContext } from "../contexts/BooksContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const BookCard = ({ book }) => {
  const { dispatch } = useContext(BooksContext);
  const { user } = useAuthContext();
  const progressArray = ["Want to Read", "Currently Reading", "Read"];
  const onDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const deletedBook = await response.json();
    try {
      dispatch({ type: "DELETE_BOOK", payload: deletedBook });
    } catch (error) {
      console.error(error);
    }
  };

  const onProgressChange = async (e) => {
    const updatedBook = { ...book, status: e.target.value };
    console.log("updatedBook", updatedBook);
    const response = fetch(`/api/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedBook),
    });

    try {
      dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
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
        <strong>Progress: </strong>
        <select onChange={(e) => onProgressChange(e)}>
          {progressArray.map((progress, index) => (
            <option
              key={index}
              value={progress}
              selected={progress == book.status}
            >
              {progress}
            </option>
          ))}
        </select>
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
