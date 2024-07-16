import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardAdmin from "./components/dashboard/dashboardAdmin/DashboardAdmin";
import DashboardUser from "./components/dashboard/dashbordUser/DashboardUser";
import Landing from "./front/Landing";
import StaticAdmin from "./components/dashboard/dashboardAdmin/StaticAdmin";
import Inputdevice from "./components/dashboard/dashbordUser/Inputdevice";
import Devices from "./components/dashboard/dashbordUser/Devices";
import Header from "./components/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "54506503089-ksnms45q7al7j9k9fuul29lvduv3mpr8.apps.googleusercontent.com"; // Your OAuth client ID

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setAuth={setAuth} />}
          />
          <Route
            exact
            path="/register"
            element={<Register setAuth={setAuth} />}
          />
          <Route element={<Header setAuth={setAuth} />}>
            <Route
              exact
              path="/dashboard-admin"
              element={<DashboardAdmin setAuth={setAuth} />}
            />
            <Route
              exact
              path="/dashboard-user"
              element={<DashboardUser setAuth={setAuth} />}
            />
            <Route
              exact
              path="/StaticAdmin"
              element={<StaticAdmin />}
            />
            <Route
              exact
              path={`/maison/:maison_id`}
              element={<Inputdevice setAuth={setAuth} />}
            />
            <Route
              exact
              path={`/devices/:maison_id`}
              element={<Devices setAuth={setAuth} />}
            />
          </Route>
          <Route
            exact
            path="/landing"
            element={<Landing />}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
