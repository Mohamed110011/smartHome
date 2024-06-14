import React, { Fragment, useState , useEffect } from "react";

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.jwtToken }
            });

            const parseRes = await response.json();
            
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("jwtToken");
        setAuth(false);
    };
    useEffect(() => {
        getName();
    }, []);
  return (
    <Fragment>
      <h1>Dashboard{name}</h1>
      <button onClick={e => logout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
