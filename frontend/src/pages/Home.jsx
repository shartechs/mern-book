import React, { useContext, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { BooksContext } from "../contexts/BooksContext";

const Home = () => {
  const { books, dispatch } = useContext(BooksContext);

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("/api/books");
      const json = await response.json();

      try {
        dispatch({ type: "SET_BOOKS", payload: json });
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();
  }, [dispatch]);

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
