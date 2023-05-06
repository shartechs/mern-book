import React, { useState, useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BookForm = () => {
  const { dispatch } = useContext(BooksContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext;

  const statuses = ["Want to Read", "Read", "Currently Reading"];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const book = { title, category, description, status };
    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });
    const addedBook = await response.json();
    if (!response.ok) {
      setError(addedBook.error);
      setEmptyFields(addedBook.emptyFields);
    } else {
      dispatch({ type: "CREATE_BOOK", payload: addedBook });
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setCategory("");
      setDescription("");
      setStatus("");
    }
  };

  return (
    <form className="book-form" onSubmit={onSubmit}>
      <label>
        Book Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes("title") ? "error" : ""}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={emptyFields.includes("category") ? "error" : ""}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={emptyFields.includes("Status") ? "error" : ""}
        >
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      {error && <div className="error">{error}</div>}
      <button type="submit">Add a Book</button>
    </form>
  );
};

export default BookForm;
