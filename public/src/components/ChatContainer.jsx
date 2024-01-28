import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { addMessageRoute, getMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser }) {

  const [ userMessages, setUserMessages ] = useState([]);

  useEffect(() => {
    const reloadUserMessages = async () => {
      const res = await axios.post(getMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      console.log(res.data);
      setUserMessages(res.data);
    }

    reloadUserMessages();

  }, [ currentChat ]);

  const sendTextMessage = async (message) => {
    await axios.post(addMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    })
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
        <div className="messages">
          {
            userMessages.map(( msg, index ) => {
              return (
                <div className="message-container">
                  <div
                    key={index}
                    className={`message ${ msg.fromSelf ? "sender" : "receiver" }`}
                  >
                    <div className="content">
                      <p>
                        { msg.message }
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <ChatInput sendTextMessage={sendTextMessage} />
      </Container>
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
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
  .message-container {
    padding: .5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: .1rem;
    overflow: auto;
    .message {
      height: fit-content;
      width: fit-content;
      display: flex;
      // align-items: center;
      padding: 10px;
      border-radius: 20px;
      .content {
        max-width: 700px;
        overflow-wrap: break-word;
        font-size: 18px;
        border-radius: 20px;
        color: #FFFFFF;
      }
    }
    .sender {
      align-self: flex-end;
      background-color: #744543;
      .content {
      }
    }
    .receiver {
      align-self: flex-start;
      background-color: #54585B;
    }
  }
`;