import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">MERN BOOK</Link>
        <nav>
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
