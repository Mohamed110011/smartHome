import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './StyleUser.css';
import headerImage from './img/1.png';

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
                       <a onclick="window.location.href='http://localhost:3000/dashboard-user'" class="active">
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

  return (
    
     
      <main>
      <div className="d-flex mt-5 justify-content-around">
        <h2>{name}'s Maison List</h2>
        <button onClick={logout} className="btn btn-primary">
          Logout
        </button>
      </div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        
      <InputMaison setMaisonsChange={setMaisonsChange} />
      <ListMaisons allMaisons={allMaisons} setMaisonsChange={setMaisonsChange} />
      </main>
  );
};

export default DashboardUser;
