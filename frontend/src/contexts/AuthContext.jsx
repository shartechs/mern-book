import { createContext, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;
    var token = user.token;
    var decoded = jwt_decode(token);
    let tokenExpirationDate = new Date(decoded.exp * 1000);
    if (tokenExpirationDate < new Date()) {
      dispatch({ type: "LOGOUT", payload: user });
    } else if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
