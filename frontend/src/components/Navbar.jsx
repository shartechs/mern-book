import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <header>
      <div className="container">
        <Link to="/">MERN BOOK</Link>
        <nav>
          <div>
            <button onClick={() => logout()}>Log out</button>
          </div>
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
