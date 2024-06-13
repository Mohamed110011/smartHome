import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // Utiliser `Switch` directement ici

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} />} />
            <Route exact path="/register" render={(props) => <Register {...props} />} />
            <Route exact path="/dashboard" render={(props) => <Dashboard {...props} />} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;