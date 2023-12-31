import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Pages
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favourites from "./pages/Favourites";


const App = () => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [likesCharacters, setLikesCharacters] = useState([]);



  const handleSingupButton = () => {
    if (!token) {
      setLoginModal(false);
      setSignupModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleLoginButton = () => {
    if (!token) {
      setSignupModal(false);
      setLoginModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModals = () => {
    setLoginModal(false);
    setSignupModal(false);
    document.body.style.overflow = "auto";
    // console.log("heee");
  };

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
      setLikesCharacters(likesCharacters)
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  
  const switchModals = () => {
    setLoginModal(!loginModal);
    setSignupModal(!signupModal);
  };




  const notify = (message) => toast.error(message);

  return (
    <Router>
      <ToastContainer />
      {signupModal ? (
        <Signup
          ToastContainer={ToastContainer}
          notify={notify}
          token={token}
          handleToken={handleToken}
          handleCloseModals={handleCloseModals}
          switchModals={switchModals}
        />
      ) : (
        ""
      )}

      {loginModal ? (
        <Login
          token={token}
          notify={notify}
          ToastContainer={ToastContainer}
          handleToken={handleToken}
          handleCloseModals={handleCloseModals}
          switchModals={switchModals}
        />
      ) : (
        ""
      )}
      <Header  setSearch={setSearch}
        token={token}
        handleToken={handleToken}
        search={search}
        handleSingupButton={handleSingupButton}
        handleLoginButton={handleLoginButton}
        setLoginModal={setLoginModal}></Header>

     
      <Routes>
        <Route
          path="/characters"
          element={
            <Characters
              search={search}
              setSearch={setSearch}
              skip={skip}
              setSkip={setSkip}
              token={token}
              likesCharacters={likesCharacters}
              setLikesCharacters={setLikesCharacters}
              setLoginModal={setLoginModal}
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={<Comics search={search}  setSearch={setSearch} skip={skip} setSkip={setSkip} token={token} />}
        />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/favourites" element={<Favourites />} token={token} setLoginModal={setLoginModal} />
      </Routes>
    </Router>
  );
};

export default App;
