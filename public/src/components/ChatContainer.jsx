import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import UserMessages from "./UserMessages";

export default function ChatContainer({ currentChat }) {

  const sendTextMessage = async (message) => {
    
  }

  return (
    <>
      <Container>
        <div className="header">
          <div className="user">
            <div className="avatar">
              <img 
                src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                alt="Avatar" 
              />
            </div>
            <div className="username">
              <h4>{currentChat.username}</h4>
            </div>
          </div>
        </div>
        <UserMessages />
        <ChatInput sendTextMessage={sendTextMessage} />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  .header {
    width: 100%;
    padding: 15px;
    display: flex;
    align-items: center;
    background-color: #242124;
    .user {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 2px;
      .avatar {
        img {
          height: 2.5rem;
          border: 2px solid #45F03C;
          border-radius: 50%;
        }
      }
      .username {
        h4 {
          font-size: 20px;
        }
      }
    }
  }
`;