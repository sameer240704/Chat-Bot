import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { snaptalkRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import WelcomeUser from "../components/WelcomeUser";
import bgImage from "../assets/bgimage.jpg";

export default function Main() {

  const navigate = useNavigate();
  const [ contacts, setContacts ] = useState([]);

  const [ currentUser, setCurrentUser ] = useState(undefined);

  const [ currentChat, setCurrentChat ] = useState(undefined);

  useEffect(() => {
    const redirect = async () => {
      try {
        const userJSON = localStorage.getItem("snaptalk-user");

        if(!userJSON) {
          navigate("/login");
        }
        else {
          const user = await JSON.parse(userJSON);
          setCurrentUser(user);
        }
      }
      catch(err) {
        console.log(`Redirect Error: ${err.message}`);
      }
    };

    redirect();

  }, [ navigate ]);

  useEffect(() => {
    const fetchData = async () => {
      if(currentUser) {
        console.log(`currentUser.isAvatarImageSet: ${currentUser.isAvatarImageSet}`);
        if(currentUser.isAvatarImageSet) {
          try {
            const response = await axios.get(`${snaptalkRoute}/${currentUser._id}`);
            setContacts(response.data);
          } 
          catch(err) {
            console.log(`Error fetching data: ${err.message}`);
          }
        } 
        else {
          navigate("/avatar");
        }
      }
    };
  
    fetchData();
  
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {

  }

  return (
    <Container>
      <div className="container">
        <Contacts 
          contacts = { contacts } 
          currentUser = { currentUser } 
          changeChat = { handleChatChange }
        />
        <WelcomeUser 
          
        />
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
    border-radius: 1rem;
    grid-template-columns: 25% 75%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;