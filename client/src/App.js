// import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Dashboard from "./components/dashboard/Dashboard-user";
// import Landing from "./Landing";
// import { ToastContainer,toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";





// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const setAuth = boolean => {
//     setIsAuthenticated(boolean);
//   };

//   async function isAuth() {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setIsAuthenticated(false);
//         return;
//       }
//       const response = await fetch("http://localhost:5000/auth/is-verify", {
//         method: "GET",
//         headers: { token: localStorage.token }
//       });

//       const parseRes = await response.json();
//       parseRes === true ? setIsAuthenticated(true) :

//       setIsAuthenticated(false);
//     } catch (err) {
//       console.error(err.message);
//     }
//   }

//   useEffect(() => {
//     isAuth();
//   }, []);
  

//   return (
//     <Fragment>
//       <Router>
//         <div className="container">
//           <Routes>
//           <Route
//               path="/"
//               element={!isAuthenticated ? <Landing  /> : <Navigate to="/dashboard-user" />}
//             />
//             <Route
//               path="/login"
//               element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard-user" />}
//             />
//             <Route
//               path="/register"
//               element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard-user" />}
//             />
//             <Route
//               path="/dashboard"
//               element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
//             />
//           </Routes>
//         </div>
//         <ToastContainer />
//       </Router>
//     </Fragment>
//   );
// }

// export default App;




// import React, { Fragment, useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import DashboardAdmin from "./components/dashboard/Dashboard-admin";
// import DashboardUser from "./components/dashboard/Dashboard-user";
// import Register from "./components/Register";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const setAuth = (boolean) => {
//     setIsAuthenticated(boolean);
//   };

//   return (
//     <Router>
//       <div className="container">
//         <Routes>
//           <Route
//             exact
//             path="/login"
//             element={<Login setAuth={setAuth} />}
//           />
//           <Route
//             exact
//             path="/dashboard-admin"
//             element={<DashboardAdmin />}
//           />
//           <Route
//             exact
//             path="/dashboard-user"
//             element={<DashboardUser />}
//           />
//           <Route
//             exact
//             path="/register"
//             element={<Register />}
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/dashboard/dashboardAdmin/DashboardAdmin";
import DashboardUser from "./components/dashboard/dashbordUser/DashboardUser";
import Landing from "./front/Landing";
import Inputdevice from "./components/dashboard/devicelist/Inputdevice";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setAuth={setAuth} />}
          />
          <Route
            exact
            path="/dashboard-admin"
            element={<DashboardAdmin setAuth={setAuth}/>}
          />
          <Route
            exact
            path="/dashboard-user"
            element={<DashboardUser setAuth={setAuth} />}
          />
          <Route
            exact
            path="/register"
            element={<Register setAuth={setAuth}/>}
          />
        
        <Route
            exact
            path="/landing"
            element={<Landing />}
          />
         <Route
  exact
  path={`/devices/:maison_id`}
  element={<Inputdevice setAuth={setAuth} />}
/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
