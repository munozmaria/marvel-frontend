import React from "react";
import logo from "../assets/img/marvel.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

const Header = ({setSearch, search, handleSingupButton, token, handleToken, handleLoginButton}) => {



  return (
    <header>
      <div className="container">

        <div className="navigation-links">
        <Link to="/home">
          <img src={logo} alt="" />
        </Link>
          <Link to="/">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favourites">Favourites</Link>
        </div>

        {!token ? (
          <div className="div-buttons-connection">
            {" "}
            <button onClick={handleSingupButton} className="button-signup">
              {" "}
              S'inscrire
            </button>
            <button onClick={handleLoginButton} className="button-login">
              Se connecter
            </button>
          </div>
        ) : (
          <div>
            <Link to="/">
              <button
                className="button-logout"
                onClick={() => {
                  handleToken(null);
                }}>
                Se déconnecter
              </button>
            </Link>
          </div>
        )}


        <div className="search" >
          <input type="text" placeholder="Recherche" value={search} className="searchInput" onChange={(event)=>{
            //console.log(event.target.value)
              setSearch(event.target.value);
          }} />
          <button className="searchButton">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
