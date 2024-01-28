import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { snaptalkRoute, host } from "../utils/APIRoutes";
import { io } from "socket.io-client";
import Contacts from "../components/Contacts";
import WelcomeUser from "../components/WelcomeUser";
import bgImage from "../assets/bgimage.jpg";
import ChatContainer from "../components/ChatContainer";

export default function Main() {

  const navigate = useNavigate();
  const socket = useRef();
  const [ contacts, setContacts ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState("");
  const [ currentChat, setCurrentChat ] = useState("");

  useEffect(() => {
    (async() => {
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
    })();

  }, [ navigate ]);

  useEffect(() => {
    (async () => {
      if(currentUser) {
        if(currentUser.isAvatarImageSet) {
          try {
            const res = await axios.get(`${snaptalkRoute}/${currentUser._id}`);
            setContacts(res.data);
          } 
          catch(err) {
            console.log(`Error fetching data: ${err.message}`);
          }
        } 
        else {
          navigate("/avatar");
        }
      }
    })();
  
  }, [ currentUser, navigate ]);

  useEffect(() => {
    ( async() => {
      if(currentUser) {
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }
    )();
  }, [ currentUser ])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts 
          contacts = { contacts } 
          currentUser = { currentUser } 
          changeChat = { handleChatChange }
        />
        {
          currentChat === "" ? (
            <WelcomeUser />
          ) : (
            <ChatContainer 
              currentChat = { currentChat } 
              currentUser = { currentUser }
              socket = { socket }
            />
          )
        }
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
    background-color: rgba(0, 0, 0, 0.7);
    display: grid;
    border-radius: 1rem;
    grid-template-columns: 25% 75%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;