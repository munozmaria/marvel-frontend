import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faX } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash, faX);

const Signup = ({ handleCloseModals, handleToken, notify }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hashPassword, setHashPassword] = useState(true);
  const [confirmHashPassword, setConfirmHashPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [identiques, setIdentiques] = useState(true);
   const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    if (
      password !== confirmPassword ||
      password === "" ||
      confirmPassword === ""
    ) {
      setIdentiques(!identiques);
      notify("Your passwords do not match")
    } else {
      fetchData();
    }
  };

  const fetchData = async () => {
 

    try {
       setErrorMessage("");
      const response = await axios.post(
        `https://site--marvel-backend--yxbrqvg2lzlq.code.run/signup`,
        {
          username: name,
          email: email,
          password: password,
         
        }
      );
     // console.log(response.data);
      handleToken(response.data.token);
      handleCloseModals(true);
      navigate("/comics");
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data.message)
      notify(error.response.data.message)
    }
  };

  return (
    <>
      <div className="formulaire" >
        <i className="closeModal" onClick={handleCloseModals}>
          <FontAwesomeIcon icon={faX} />
        </i>
        <div className="formContainer">
          <form
        onSubmit={handleSignup}
          >
            <h1>Create an account</h1>

            <input
              id="name"
              type="text"
              placeholder="Name"
              name="username"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />

            <input
              id="email"
              value={email}
              type="email"
              placeholder="Email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <div className="passwordInput">
              <input
                id="password"
                 className={identiques ? "" : "wrong"}
                type={hashPassword ? "password" : "text"}
                value={password}
                placeholder="Password"
                name="password"
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

            <div className="passwordInput">
              <input
                id="confirmPassword"
                 className={identiques ? "" : "wrong"}
                type={confirmHashPassword ? "password" : "text"}
                value={confirmPassword}
                placeholder="Confirm your password"
                name="confirmedPassword" 
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
              <FontAwesomeIcon
                className="eyeIcon"
                icon={confirmHashPassword ? "eye" : "eye-slash"}
                onClick={() => {
                  setConfirmHashPassword(!confirmHashPassword);
                }}
              />
            </div>
            {identiques === false && (
            <span style={{ color: "red" }}>
              Les mots de passe ne sont pas indentiques
            </span>
          )}

            <button className="buttonFormulaire" type="submit">Sign up</button>

            <p>Already have an account? Connect you !</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
