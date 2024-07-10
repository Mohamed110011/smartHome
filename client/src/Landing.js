import React from "react";
import { Link } from "react-router-dom";
import './assets/css/agency.min.css';
import './assets/css/bootstrap.min.css';
import './App.css';
import './assets/css/style.css';
import Portfolio from './components/Portfolio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faSignIn, faBars } from '@fortawesome/free-solid-svg-icons';






const Landing = () => {
  return (
    <div className="main-container">
      <div className="background"></div>
      <img src="assets/images/decor.png" alt="" className="decor" />

      <div className="navbar">
        <a href="#" className="main-logo">
          <img src="assets/images/logo.svg" alt="Main Logo" />
        </a>
        <a href="#" className="reslogo">
          <img src="assets/images/res-logo.svg" alt="Restaurant Logo" />
        </a>

        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Service</a></li>
          <li><a href="#">Shop</a></li>
        </ul>

        <div className="nav-icon">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
          </a>
          <a href="#">
            <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
          </a>
        </div>

        <div className="nav-btn">
          <button>
            <FontAwesomeIcon icon={faSignIn} aria-hidden="true" />
            Sign In
          </button>
          <button>
            <FontAwesomeIcon icon={faSignIn} aria-hidden="true" />
            Sign Up
          </button>
        </div>

        <button className="toggle-btn">
          <FontAwesomeIcon icon={faBars} aria-hidden="true" />
        </button>
      </div>

      <div className="left-side">
        <div className="heading">
          <h1>Discover the</h1>
          <h2>Taste of Excellence</h2>
        </div>
        <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt maiores odit quaerat iure quisquam cupiditate sit itaque dignissimos nobis deleniti?</p>
        <div className="total-price">
          <h2>Total Order : </h2>
          <h3>$22.35</h3>
        </div>
        <button>
          <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true" />
          Buy Now
        </button>
      </div>

      <div className="right-side">
        <img src="assets/images/dish.png" alt="Dish" className="dish" />
      </div>
    </div>
  );
}
export default Landing;
