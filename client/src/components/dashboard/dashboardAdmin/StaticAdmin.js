import React, { useEffect, useState } from "react";

const UserStatistics = () => {
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

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Statistics</h2>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Active Users: {stats.activeUsers}</p>
      <p>Inactive Users: {stats.inactiveUsers}</p>
      <p>New Users This Month: {stats.newUsersThisMonth}</p>
      {/* Add more statistics as needed */}
    </div>
  );
};

export default UserStatistics;
