import React, { useContext, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { BooksContext } from "../contexts/BooksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { books, dispatch } = useContext(BooksContext);
  const { user } = useAuthContext();

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("/api/books", {
        headers: { "Authorization": `Bearer ${user.token}` },
      });
      const json = await response.json();

      try {
        dispatch({ type: "SET_BOOKS", payload: json });
      } catch (error) {
        console.error(error);
      }
    };
    if (user) {
      getBooks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="books">
        {books &&
          books.map((book, index) => <BookCard key={index} book={book} />)}
      </div>
      <BookForm />
    </div>
  );
};

export default Home;
