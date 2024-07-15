import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// components
import InputMaison from "../maisonlist/InputMaison";
import ListMaisons from "../maisonlist/ListMaison";

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

  

  useEffect(() => {
    getProfile();
    setMaisonsChange(false);
  }, [maisonsChange]);





  return (
    <><InputMaison />
    <ListMaisons allMaisons={allMaisons} setMaisonsChange={setMaisonsChange} />
   </>
   
  );
}
      

export default DashboardUser;
