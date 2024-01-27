import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function Logout() {

  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Button>
      <button 
        className="logout"
        onClick={() => logoutUser()}
        style={{ color: "#222629"}}
      >
        <FontAwesomeIcon 
          icon={ faRightToBracket } 
          className="quit"
        />
      </button>
    </Button>
  )
}

const Button = styled.div`
  .logout {
    background: transparent;
    border: 0;
    position: absolute;
    top: 662px;
    left: 385px;
    padding: 5px;
    border-radius: 5px;
    .quit {
        height: 1.5rem;
        cursor: pointer;
        transition: .5s ease-in-out;
    }
    &:active {
      scale: 0.9;
    }
  }
`;