import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ListUsers from "../userslist/ListUsers";
import './styleAdmin.css';
import headerImage from './img/1.png';




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
            <h3>M<span>odern</span></h3>
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
                            <span class="las la-home"></span>
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
                       <a href="">
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
        
        <header>
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

  return (
     <div>
      
      
      <main>  
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Dashboard</h2>
        <button onClick={(e) => logout(e)} className="btn btn-primary">
          Logout
        </button>
      </div>   
         <ListUsers allUsers={users} setUsersChange={setUsers} />
      </main>
      
      <div className="main-content">
        <header>
          <div className="header-content">
            <label htmlFor="menu-toggle">
              <span className="las la-bars"></span>
            </label>
            
            <div className="header-menu">
              <div className="user">
                <div className="bg-img" style={{ backgroundImage: 'url(img/1.jpeg)' }}></div>
                <span className="las la-power-off"></span>
                <span onClick={logout}>Logout</span>
              </div>
            </div>
          </div>
        </header>
        
        <main>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </main>
      </div>
    </div>
  );
};
export default DashboardAdmin;
