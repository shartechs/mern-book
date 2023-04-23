import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";

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
        {books &&
          books.map((book, index) => <BookCard key={index} book={book} />)}
      </div>
      <BookForm />
    </div>
  );
};

export default Home;
