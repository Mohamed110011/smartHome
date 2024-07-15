import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListUsers from "../userslist/ListUsers";




const DashboardAdmin = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/users", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user data");
      }

      const parseData = await res.json();
      setUsers(parseData);
      setName("Admin");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to fetch user data");
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
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);


  

  return (
     <div>
      
      
      <main>  


         <ListUsers allUsers={users} setUsersChange={setUsers} />
      </main>
     
        
        <main>
         
        </main>
      </div>
    
    
  );
};
export default DashboardAdmin;
