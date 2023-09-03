import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";



library.add(faEye, faEyeSlash, faX);

const Login = ({ handleCloseModals, handleToken, switchModals, notify }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
 

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
       
        const response = await axios.post(
          `https://site--marvel-backend--yxbrqvg2lzlq.code.run/login`,
          {
            email: email,
            password: password,
          }
        );

        handleToken(response.data.token);
        if (response.data.token) {
          navigate("/");
          handleCloseModals(true);
        } else {
          alert("Une erreur est survenue, veuillez réssayer.");
        }
      } catch (error) {
        console.log(error.response.data);
        setErrorMessage(error.response.data.message)
        notify(error.response.data.message)
      }
    } else {

      notify("Must specify your email and your password")
      setErrorMessage("Must specify your email and your password");
     
    }
  };

  return (
    <div className="formulaire">
      <div>
        <i className="closeModal">
          <FontAwesomeIcon icon={faX} onClick={handleCloseModals} />
        </i>
        <div className="formContainer">
          <form action="" onSubmit={handleLogin}>
            <h1>Login</h1>

            <input
              type="text"
              placeholder="email"
              autoCapitalize="none"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <div className="passwordInput">
              <input
                placeholder="password"
                autoCapitalize="none"
                value={password}
                type={hashPassword ? "password" : "text"}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <FontAwesomeIcon
                className="eyeIcon"
                icon={hashPassword ? "eye" : "eye-slash"}
                onClick={() => {
                  setHashPassword(!hashPassword);
                }}
              />
            </div>
            <button className="buttonFormulaire">Login</button>
            <p onClick={switchModals}>Pas encore de compte? Inscris-toi!</p>
          <span style={{color: "red"}}>{errorMessage}</span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
