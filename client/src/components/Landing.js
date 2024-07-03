import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>Welcome to Todo City</h1>
      <p>Sign In and start building your todo list</p>
      <Link to="/login" >
        Login
      </Link>
      <Link to="/register" >
        Register
      </Link>
    </div>
  );
};

export default Landing;