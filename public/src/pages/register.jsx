import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import bgImage from '../assets/bgimage.jpg';

export default function Register() {

  const [ values, setValues ] = useState({
    email: "",
    password:"",
    confirmPassword:""
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form has been submitted")
  }

  const handleChange = (event) => {
    event.preventDefault();
    // alert("Change Event Occured")
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="header">
            <img src={Logo} alt="Logo" className="logo"></img>
            <h1>SnapTalk</h1>
            <h2>Register</h2>
          </div>
            <input 
              type="text"
              name="username"
              placeholder="Username"
              onChange={(event) => {handleChange(event)}}
            />
            <input 
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => {handleChange(event)}}
            />
            <input 
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => {handleChange(event)}}
            />
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(event) => {handleChange(event)}}
            />
            <button type="submit">Sign Up</button>
            <span>Already have an account? <Link to="/login">Sign In Now</Link></span>
        </form>
      </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bgImage});
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
    height: 600px;
    width: 400px;
    padding: 50px;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    border: 0;
    border-radius: px;
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
  button {
    margin-top: 20px;
    padding: 15px;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 10px;
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