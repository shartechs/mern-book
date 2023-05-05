import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setIsLoading(true);
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(user.error);
    }
    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // set user state in AuthContext
      dispatch({ type: "LOGIN", payload: user });

      setIsLoading(false);
      setError(null);
    }
  };

  return { signup, error, isLoading };
};
