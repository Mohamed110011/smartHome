import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faBars } from "@fortawesome/free-solid-svg-icons";
import { Outlet , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";



function Header({setAuth}) {
    const navigate = useNavigate();
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
      React.useEffect(() => {
    if (!localStorage.token) {
        return navigate("/login");
    }
    
}, [navigate]);

  return (

    <div className="row">
        <div className="col-2">
        <Sidebar/>
        </div>
              
<div className="col-10 pr-4">
<header className="d-flex justify-content-between border-bottom py-3">
      <FontAwesomeIcon icon={faBars}  />
      <FontAwesomeIcon icon={faPowerOff} onClick={logout} />
    </header>
    
    <Outlet/>
</div>
        
    </div >
   
  );
}

export default Header;