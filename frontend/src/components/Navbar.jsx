import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header>
      <div className="container">
        <Link to="/">MERN BOOK</Link>
        <nav>
          {user ? (
            <div>
              <span>{user.email}</span>
              <button onClick={() => logout()}>Log out</button>
            </div>
          ) : (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
