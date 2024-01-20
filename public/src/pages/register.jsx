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
            <button type="submit">
              <span class="circle1"></span>
              <span class="circle2"></span>
              <span class="circle3"></span>
              <span class="circle4"></span>
              <span class="circle5"></span>
              <span class="text">Sign Up</span>
            </button>
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
    transform: translate(-7em, -8em);
  }
  
  button span:nth-child(2) {
    transform: translate(-5em, 1.7em);
  }
  
  button span:nth-child(3) {
    transform: translate(-.2em, 1.8em);
  }
  
  button span:nth-child(4) {
    transform: translate(3.5em, 1.4em);
  }
  
  button span:nth-child(5) {
    transform: translate(3.5em, -3.8em);
  }
  
  button:hover span:not(:nth-child(6)) {
    transform: translate(-50%, -50%) scale(4);
    transition: 1.5s ease;
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