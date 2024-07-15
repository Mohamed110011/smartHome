import React, { useEffect, useState } from "react";




const UserStatistics = () => {
    const [name, setName] = useState("Admin");
  const [stats, setStats] = useState(null);

  const fetchStatistics = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/user-stats", {
        method: "GET",
        headers: { "Content-Type": "application/json", token: localStorage.token }
      });
      const jsonData = await response.json();
      setStats(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

   
 
    return(
    <main>
    
    <h1 >User Statistics</h1>
    




  </main>
    ) 
  }




  


export default UserStatistics;
