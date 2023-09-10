import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/img/marvel1.png";
import { Link } from "react-router-dom";


const Header = ({
  setSearch,
  search,
  handleSingupButton,
  token,
  handleToken,
  handleLoginButton,
  setLoginModal,
}) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);

  const [isVisible, ] = useState(true);

  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    setmenuOpen(false);
    
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
    } else {
      document.body.style.overflow = "auto";
      setClick(false)
    }
    setmenuOpen(false);
  };

  return (
    <header ref={menuRef}>
      <Link className="logo" to="/">
        <img src={logo} alt="" />
      </Link>
      

      {!token ? (
        <div className="div-buttons-connection">
          {" "}
          <div
            style={{ right: "18vw" }}
            onClick={handleSingupButton}
            className={isVisible ? "login signup" : "login hidden"}>
            {" "}
            Signup
          </div>
          <div
            onClick={handleLoginButton}
            className={isVisible ? "login" : "login hidden"}>
            Login
          </div>
        </div>
      ) : (
        <div>
          <Link to="/">
            <div className="div-buttons-connection">
              <div
                 className={isVisible ? "login" : "login hidden"}
                onClick={() => {
                  handleToken(null);
                }}>
                Logout
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className={menuOpen ? "open" : "close"}>
        <div
          className={isVisible ? "burger" : "burger hidden"}
          title="Open/Close menu"
          onClick={() => {
            setloginOpen(true);
            setmenuOpen(!menuOpen);
          }}>
          <div className="line l1"></div>
          <div className="line l2"></div>
          <div className="line l3"></div>
        </div>
        <div id="menu">
          {loginOpen && (
            <>
              <div>
                <div className="wrapper">
                  {" "}
                  <span className="label-menu">MENU</span>
                  <ul>
                    <li>
                      <div className="chakra-link active css-1udx80">
                        <span>
                          <Link
                            to={"/characters"}
                            className="text-link"
                            onClick={handleClick}>
                            Characters
                          </Link>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div
                        className="chakra-link css-1udx80"
                        onClick={handleClick}>
                        <span>
                          <Link to={"/comics"} className="text-link">
                            Comics
                          </Link>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="chakra-link css-1udx80">
                        <span>
                          <Link
                            to={token ? "/favourites" : "/"}
                            className="text-link"
                            onClick={handleClickFavorites}>
                            Favorites
                          </Link>
                        </span>
                      </div>
                    </li>
                  </ul>{" "}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
