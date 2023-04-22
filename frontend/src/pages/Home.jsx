import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("/api/books");
      const json = await response.json();

      try {
        setBooks(json);
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="home">
      <div className="books">
        {" "}
        {books && books.map((book) => <BookCard book={book} />)}
      </div>
    </div>
  );
};

export default Home;
