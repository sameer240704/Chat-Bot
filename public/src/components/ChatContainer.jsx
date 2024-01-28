import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { addMessageRoute, getMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [ userMessages, setUserMessages ] = useState([]);
  const [ arrivalMessage, setArrivalMessage ] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    (async () => {
      if(currentChat) {
        const res = await axios.post(getMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setUserMessages(res.data);
      }
    })();

  }, [ currentChat ]);

  useEffect(() => {
    ( async () => {
      if(socket.current) {
        socket.current.on("msg-receive", (message) => {
          setArrivalMessage({ fromSelf: false, message: message });
        })
      }
    })();
  }, []);

  useEffect(() => {
    arrivalMessage && setUserMessages((prev) => 
      [...prev, arrivalMessage]
    );
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [ userMessages ]);

  const sendTextMessage = async (message) => {
    await axios.post(addMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: message,
    });

    const messages = [...userMessages];
    messages.push({ fromSelf: true, message: message });
    setUserMessages(messages);
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
                  <div
                    ref={scrollRef}
                    key={uuidv4()}
                    className={`message ${ msg.fromSelf ? "sender" : "receiver" }`}
                  >
                    <div className="content">
                      <p>
                        { msg.message }
                      </p>
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
  .messages {
    padding: .5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: .1rem;
    overflow: auto;
    gap: .5rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      background-color: transparent;
      &-thumb {
        background-color: #744543;
        width: 0.1rem;
        border-radius: 20px;
      }
    }
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