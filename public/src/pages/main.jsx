import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { snaptalkRoute } from "../utils/APIRoutes";
import bgImage from "../assets/bgimage.jpg";

export default function Main() {

  const navigate = useNavigate();
  const [ contacts, setContacts ] = useState([]);

  const [ currentUser, setCurrentUser ] = useState(undefined);

  const redirect = async () => {
    if(!localStorage.getItem("snaptalk-user")) {
        navigate("/login")
    }
    else {
      setCurrentUser(await JSON.parse(localStorage.getItem("snaptalk-user")));
    }
  };

  useEffect(() => {
    redirect();
  }, []);

  const getData = async () => {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${snaptalkRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      else {
        navigate("/avatar");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div className="container">

      </div>
    </Container>
  )
}

const Container = styled.div`
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
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(0, 0, 0, 0.6);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;