import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const DashboardAdmin = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Utiliser useNavigate pour obtenir la fonction de navigation

  const getAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setUsers(parseData);
      setName("Admin");
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
      navigate("/login"); // Utiliser navigate pour rediriger vers /login après la déconnexion
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Dashboard</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>
      <h3>All Users:</h3>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>{user.user_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardAdmin;
