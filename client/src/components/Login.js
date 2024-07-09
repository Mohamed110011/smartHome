// import React, { Fragment, useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = ({ setAuth }) => {
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: ""
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const { email, password } = inputs;

//   const onChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { email, password };
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body)
//       });

//       const parseRes = await response.json();

//       if (parseRes.token) {
//         localStorage.setItem("token", parseRes.token);
//         setAuth(true);
//         //setIsAuthenticated(true);
//         toast.success("Logged in Successfully");
//       } else {
//         setAuth(false);
//         toast.error(parseRes);
//       }
//     } catch (err) {
//       console.error(err.message);
//       toast.error("Something went wrong with the login");
//     }
//   };

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" />;
//   }

//   return (
//     <Fragment>
//       <h1>Login</h1>
//       <form onSubmit={onSubmitForm}>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => onChange(e)}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => onChange(e)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <Link to="/register">Register</Link>
//     </Fragment>
//   );
// };

// export default Login;
// import React, { Fragment, useState } from "react";
// import { Link, useNavigate,Navigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Login = ({ setAuth }) => {
//   const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

//   const [inputs, setInputs] = useState({
//     email: "",
//     password: ""
//   });
//   const [redirectPath, setRedirectPath] = useState(null);

//   const { email, password } = inputs;

//   const onChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { email, password };
//       const response = await fetch("http://localhost:5000/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body)
//       });

//       const parseRes = await response.json();
//       console.log("Response from server:", parseRes); // Vérification dans la console

//       if (parseRes.token) {
//         localStorage.setItem("token", parseRes.token);
//         setAuth(true);
//         toast.success("Logged in Successfully");

//         // Vérification et redirection basée sur le nom d'utilisateur
//         if (parseRes.name === "admin") {
//           console.log("User is admin, redirecting to admin dashboard");
//           setRedirectPath("/dashboard-admin"); // Redirection vers dashboard-admin pour les admins
//         } else {
//           console.log("User is not admin, redirecting to user dashboard");
//           setRedirectPath("/dashboard-user"); // Redirection vers dashboard-user pour les utilisateurs normaux
//         }
//       } else {
//         setAuth(false);
//         toast.error(parseRes);
//       }
//     } catch (err) {
//       console.error(err.message);
//       toast.error("Something went wrong with the login");
//     }
//   };

//   if (redirectPath) {
//     return <Navigate to={redirectPath} />;
//   }

//   return (
//     <Fragment>
//       <h1>Login</h1>
//       <form onSubmit={onSubmitForm}>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           value={email}
//           onChange={(e) => onChange(e)}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => onChange(e)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       <Link to="/register">Register</Link>
//     </Fragment>
//   );
// };

// export default Login;

import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  );
};

export default Login;
