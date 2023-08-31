import React from "react";
import logo from "../assets/img/marvel.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>

        <div className="navigation-links">
          <Link to="/">Personages</Link>
          <Link to="/comics">Comics</Link>
          <Link>Favoris</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
