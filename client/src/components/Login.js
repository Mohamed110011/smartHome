import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/Login.css"; // Assurez-vous d'importer votre fichier CSS pour le style

const Login = ({ setAuth }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Logged in Successfully");

        // Redirection en fonction du rôle de l'utilisateur
        if (parseRes.name === "admin") {
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-user");
        }
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Something went wrong with the login");
    }
  };

  return (
    <Fragment>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={onSubmitForm}>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
          <button type="submit" className="btn-login">Login</button>
        </form>
        <Link to="/register" className="link-register">Register</Link>
      </div>
    </Fragment>
  );
};

export default Login;