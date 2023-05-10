import React, { useContext, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { BooksContext } from "../contexts/BooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import FilterMenu from "../components/FilterMenu";

const Home = () => {
  const { filteredBooks, dispatch } = useContext(BooksContext);
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
        <FilterMenu />
        {filteredBooks && filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            The current list is empty.
          </div>
        )}
      </div>
      <BookForm />
    </div>
  );
};

export default Home;
