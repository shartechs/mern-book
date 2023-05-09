import { createContext, useReducer } from "react";

export const BooksContext = createContext();

export const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {
        books: action.payload,
        filteredBooks: action.payload,
      };
    case "FILTER_BOOKS":
      const filteredBooks =
        action.payload === "All"
          ? state.books
          : state.books.filter(
              (book) =>
                book.status.toLowerCase() === action.payload.toLowerCase()
            );
      return { ...state, filteredBooks };
    case "CREATE_BOOK":
      return {
        books: [action.payload, ...state.books],
      };
    case "DELETE_BOOK":
      return {
        books: state.books.filter((book) => book._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const BooksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, {
    books: null,
    filteredBooks: null,
  });
  console.log("book-state", state);

  return (
    <BooksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BooksContext.Provider>
  );
};
