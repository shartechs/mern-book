import { createContext, useReducer } from "react";

export const BooksContext = createContext();

const applyFilter = (books, filter) => {
  return filter === "All"
    ? books
    : books.filter(
        (book) => book.status.toLowerCase() === filter.toLowerCase()
      );
};

export const booksReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_BOOKS":
      return {
        ...state,
        books: payload,
        filteredBooks: payload,
      };
    case "FILTER_BOOKS":
      return {
        ...state,
        filteredBooks: applyFilter(state.books, payload),
        filter: payload,
      };
    case "CREATE_BOOK":
      return {
        ...state,
        books: [payload, ...state.books],
        filteredBooks: applyFilter([payload, ...state.books], state.filter),
      };
    case "DELETE_BOOK":
      return {
        books: state.books.filter((book) => book._id !== payload._id),
        filteredBooks: applyFilter(
          state.books.filter((book) => book._id !== payload._id),
          state.filter
        ),
      };
    case "UPDATE_BOOK":
      const updatedBooks = state.books.map((book) =>
        book._id === payload._id ? payload : book
      );
      return {
        ...state,
        books: updatedBooks,
        filteredBooks: applyFilter(updatedBooks, state.filter),
      };
    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null,
    filteredBooks: null,
    filter: "ALL",
  });
  console.log("book-state", state);

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};
