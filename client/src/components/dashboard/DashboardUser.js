// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// //components

// import InputMaison from "./todolist/InputMaison";
// import ListMaisons from "./todolist/ListMaison";

// const Dashboard = ({ setAuth }) => {
//   const [name, setName] = useState("");
//   const [allMaisons, setAllMaisons] = useState([]);
//   const [maisonsChange, setMaisonsChange] = useState(false);

//   const getProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/dashboard/", {
//         method: "GET",
//         headers: { token: localStorage.token }
//       });

//       const parseData = await res.json();

//       setAllMaisons(parseData);

//       setName(parseData[0].user_name);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const logout = async e => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem("token");
//       setAuth(false);
//       toast.success("Logout successfully");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//     setMaisonsChange(false);
//   }, [maisonsChange]);

//   return (
//     <div>
//       <div className="d-flex mt-5 justify-content-around">
//         <h2>{name} 's Maison List</h2>
//         <button onClick={e => logout(e)} className="btn btn-primary">
//           Logout
//         </button>
//       </div>

//       <InputMaison setMaisonsChange={setMaisonsChange} />
//       <ListMaisons allMaisons={allMaisons} setMaisonsChange={setMaisonsChange} />
//     </div>
//   );
// };


// export default Dashboard;

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
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
      navigate("/login");
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
