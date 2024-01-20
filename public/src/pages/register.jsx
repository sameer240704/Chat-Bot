import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";

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
    alert("Change Event Occured")
  }

  return (
    <>
      <img src={Logo} alt="Logo"></img>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div>
            <h1>SnapTalk</h1>
            <h1>Register</h1>
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
`;