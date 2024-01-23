import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import bgImage from '../assets/bgimage.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {

  const navigate = useNavigate();

  const [ values, setValues ] = useState({
    username: "",
    password:"",
  });

  const [ showPassword, setShowPassword ] = useState(false);

  const [ isChecked, setChecked ] = useState(false);

  const handleCheckboxChange = () => setChecked(!isChecked);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme:"dark",
  };

  useEffect(() => {
    if(localStorage.getItem("snaptalk-user")) {
      navigate("/");
    }
  }, [ navigate ]);
  
  const handleValidation = () => {
    const { username, password } = values;

    if(username === "") {
      toast.error("Username Is Required", toastOptions);
      return false;
    }
    else if(password === "") {
      toast.error("Password Is Required", toastOptions);
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(!data.status) {
        toast.error(data.msg, toastOptions);
      }
      if(data.status) {
        localStorage.setItem("snaptalk-user", JSON.stringify(data));

        if(isChecked) {
          localStorage.setItem("snaptalk-remember", "true");
        }
        navigate("/");
      } 
    }
  };
  
  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    const rememberMe = localStorage.getItem("snaptalk-remember");
    const user = localStorage.getItem("snaptalk-user");

    if(rememberMe === "true" && user) {
      navigate("/avatar");
    }
  }, [ navigate ]);

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <img src={Logo} alt="Logo" className="logo"></img>
            <h1>SnapTalk</h1>
            <h2>Login</h2>
          </div>
            <input 
              type="text"
              name="username"
              placeholder="Username"
              min="3"
              onChange={(event) => {handleChange(event)}}
            />
            <input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="eye-container"
              onChange={(event) => {handleChange(event)}}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="icon1"
              onClick={() => setShowPassword(!showPassword)}
            />
            <label>
            <input  
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Remember Me?              
            </label>
            <button type="submit">
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Sign In</span>
            </button>
            <span>New to SnapTalk? <Link to="/register" className="link">Sign Up Now</Link></span>
        </form>
      </FormContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
                    url(${bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  
  .logo {
    height: 50px;
    width: 50px;
  }

  .logo:hover {
    transform: rotateY(45deg);
    animation: rotateAnimation 1s linear infinite;
  }

  form {
    height: 500px;
    width: 400px;
    padding: 50px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    border: 0;
    border-radius: 10px;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 30px;
      margin-bottom: 20px;
      margin-top: 5px;
    }
    h2 {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }

  input {
    border: 0;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    background: #525252;
    color: #fff7f7;
    font-size: 16px;
  }

  .eye-container {
    padding: 15px 45px 15px 15px;
  }

  .icon1 {
    position: absolute;
    top: 425px;
    left: 885px;
    cursor: pointer;
  }

  label {
    font-weight: 600;
    font-size: 16px;
    input {
      margin-right: 3px;
    }
  }

  button {
    font-weight: bold;
    color: white;
    background-color: #171717;
    padding: 1em 2em;
    border: none;
    border-radius: .6rem;
    margin-top: 20px;
    padding: 15px;
    font-size: 16px;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }
  
  button span:not(:nth-child(6)) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 76px;
    width: 76px;
    background-color: #0c66ed;
    border-radius: 50%;
    transition: .6s ease;
  }
  
  button span:nth-child(6) {
    position: relative;
  }
  
  button span:nth-child(1) {
    transform: translate(-7em, -6.3em);
  }
  
  button span:nth-child(2) {
    transform: translate(-9em, 2.5em);
  }
  
  button span:nth-child(3) {
    transform: translate(-2em, 3.5em);
  }
  
  button span:nth-child(4) {
    transform: translate(4em, 1.6em);
  }
  
  button span:nth-child(5) {
    transform: translate(3em, -6.7em);
  }
  
  button:hover span:not(:nth-child(6)) {
    transform: translate(-50%, -50%) scale(4);
    transition: 1.5s ease;
  }  

  .link {
    text-decoration: none;
    color: #f7f7ff;
    font-weight: 600;
  }

  @keyframes rotateAnimation {
	  from { 
      transform: rotateY(45deg); 
    }
	  to { 
      transform: rotateY(225deg); 
    }
  }
`;