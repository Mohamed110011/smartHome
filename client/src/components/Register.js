import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/Registre.css";

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { email, password, name } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { email, password, name };
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                setIsAuthenticated(true); // Set isAuthenticated to true upon successful registration
                toast.success("Registered Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    if (isAuthenticated) { // Use isAuthenticated state for navigation
        return <Navigate to="/dashboard-user" />;
    }

    return (
        <Fragment>
            <div className="register-container">
                <h1>Register</h1>
                <form onSubmit={onSubmitForm}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={onChange}
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={onChange}
                    />
                    <button type="submit">Register</button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        </Fragment>
    );
};
export default Register;
