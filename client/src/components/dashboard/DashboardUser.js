import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// components
import InputMaison from "./todolist/InputMaison";
import ListMaisons from "./todolist/ListMaison";

const DashboardUser = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allMaisons, setAllMaisons] = useState([]);
  const [maisonsChange, setMaisonsChange] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();

      if (parseData.length > 0) {
        setAllMaisons(parseData);
        setName(parseData[0].user_name);
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to load profile data");
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      if (localStorage.token)
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
      navigate("/login"); // Redirige vers la page principale de l'application après le logout
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    getProfile();
    setMaisonsChange(false);
  }, [maisonsChange]);

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Maison List</h2>
        <button onClick={logout} className="btn btn-primary">
          Logout
        </button>
      </div>

      <InputMaison setMaisonsChange={setMaisonsChange} />
      <ListMaisons allMaisons={allMaisons} setMaisonsChange={setMaisonsChange} />
    </div>
  );
};

export default DashboardUser;
