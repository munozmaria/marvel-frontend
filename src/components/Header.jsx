import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/img/marvel.png";
import { Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faBars, faX);

const Header = ({
  setSearch,
  search,
  handleSingupButton,
  token,
  handleToken,
  handleLoginButton,
  setLoginModal,
}) => {

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    document.body.style.overflow = click ? "auto" : "hidden";
  };

  const handleClickClosed = () => {
    setClick(false);
    document.body.style.overflow = "auto";
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setClick(false);
        //console.log(menuRef.current)
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleClickFavorites = () => {
    if (!token) {
      setLoginModal(true);
    } else{
      setClick(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header ref={menuRef} className={click ? "main-container" : ""}>
      <Link to="/home">
        <img src={logo} alt="" />
      </Link>
      <div className={click ? "container-nav active" : "container-nav"}>
        <div className="navigation-links">
          <Link to="/" onClick={click ? handleClick : false}>Characters</Link>
          <Link to="/comics"  onClick={click ? handleClick : false}>Comics</Link>
          <Link to={token ? "/favourites" : "/"} onClick={handleClickFavorites}>
            Favourites
          </Link>
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
              <div className="div-buttons-connection">
                <button
                  className="button-logout"
                  onClick={() => {
                    handleToken(null);
                  }}>
                  Se déconnecter
                </button>
              </div>
            </Link>
          </div>
        )}

        <div className="search">
          <input
            type="text"
            placeholder="Recherche"
            value={search}
            className="searchInput"
            onChange={(event) => {
              //console.log(event.target.value)
              setSearch(event.target.value);
            }}
          />
          <button className="searchButton">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      <div className="nav-icon">
        {click === true ? (
          <FontAwesomeIcon icon={faX} onClick={handleClickClosed} />
        ) : (
          <FontAwesomeIcon icon={faBars} onClick={handleClick} />
        )}
      </div>
    </header>
  );
};

export default Header;
