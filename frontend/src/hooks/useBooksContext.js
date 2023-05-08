import { BooksContext } from "../contexts/BooksContext";
import { useContext } from "react";

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw Error(
      "useBooksContext must be used inside an WorkoutsContextProvider"
    );
  }

  return context;
};
