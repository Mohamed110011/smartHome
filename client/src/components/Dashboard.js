import { Fragment } from "react";

const Dashboard = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Logout</button>
      {/* Autres éléments du tableau de bord */}
    </Fragment>
  );
};

export default Dashboard;
