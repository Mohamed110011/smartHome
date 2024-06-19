import React, { Fragment, useState , useEffect } from "react";
import { toast } from "react-toastify";
const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            setName(parseRes.user_name);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }
    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logout successfully");
        } catch (err) {
            console.error(err.message);
        }
        localStorage.removeItem("token");
        setAuth(false);
    };
    useEffect(() => {
        getName();
    }, []);
  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button onClick={e => logout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
