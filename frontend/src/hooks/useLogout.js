import { useAuthContext } from "./useAuthContext";
import { useBooksContext } from "./useBooksContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: booksDispatch } = useBooksContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // reset user state to null in AuthContext
    dispatch({ type: "LOGOUT" });
    booksDispatch({ type: "SET_BOOKS", payload: null });
  };

  return { logout };
};

export default useLogout;
