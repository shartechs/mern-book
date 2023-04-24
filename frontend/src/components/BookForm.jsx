import React, { useState, useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

const BookForm = () => {
  const { dispatch } = useContext(BooksContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Want to Read");
  const [error, setError] = useState(null);

  const statuses = ["Want to Read", "Read", "Currently Reading"];

  const onSubmit = async (e) => {
    e.preventDefault();
    const book = { title, category, description, status };
    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      dispatch({ type: "CREATE_BOOK", payload: json });
      setError(null);
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
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
