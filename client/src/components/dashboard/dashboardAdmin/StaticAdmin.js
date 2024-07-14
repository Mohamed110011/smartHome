import React, { useEffect, useState } from "react";
import './styleAdmin.css';
import headerImage from './img/1.png';



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

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <title>Modern Admin Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
</head>
<body>
   <input type="checkbox" id="menu-toggle">
    <div class="sidebar">
        <div class="side-header">
          
        </div>
        
        <div class="side-content">
            <div class="profile">
               
<img  class="profile-img bg-img" src="${headerImage}" alt="Client Image">

                <h4>${name}</h4>
                <small>Art Director</small>
            </div>

            <div class="side-menu">
                <ul>
                    <li>
                       <a onclick="window.location.href='http://localhost:3000/dashboard-admin'" class="active">
                            <small>Dashboard</small>
                        </a>
                    </li>
                    <li>
                       <a href="">
                            <span class="las la-user-alt"></span>
                            <small>Profile</small>
                        </a>
                    </li>
                    <li>
                       <a href="">
                            <span class="las la-envelope"></span>
                            <small>Mailbox</small>
                        </a>
                    </li>
                    <li>
                       <a href="/StaticAdmin">
                            <span class="las la-clipboard-list"></span>
                            <small>Projects</small>
                        </a>
                    </li>
                    <li>
                       <a href="">
                            <span class="las la-shopping-cart"></span>
                            <small>Orders</small>
                        </a>
                    </li>
                    <li>
                       <a href="">
                            <span class="las la-tasks"></span>
                            <small>Tasks</small>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </div>
    
    <div class="main-content">
        
        <header class="header">
            <div class="header-content">
                <label for="menu-toggle">
                    <span class="las la-bars"></span>
                </label>
                
                <div class="header-menu">
                   
                    
                    <div class="notify-icon">
                       
                    </div>
                    
                    <div class="notify-icon">
                      
                    </div>
                    
                    <div class="user">
                        <div class="bg-img" style="background-image: url(img/1.jpeg)"></div>
                        
                        <span class="las la-power-off"></span>
                        <span onClick={logout}>Logout</span>
                    </div>
                </div>
            </div>
        </header>
        
        
        <main>
            
            
        </main>
        
    </div>
</body>
</html>

  `;

 
    return(
    <main>
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    <h1 >User Statistics</h1>
    




  </main>
    ) 
  }




  


export default UserStatistics;
