import { useAuthContext } from "./useAuthContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from local storage
    localStorage.removeItem("user");

    // reset user state to null in AuthContext
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};

export default useLogout;
