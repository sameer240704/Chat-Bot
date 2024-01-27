import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function ChatInput({ sendTextMessage }) {

    const [ showEmojiPicker, setShowEmojiPicker ] = useState(false);
    const [ emojiMessage, setEmojiMessage ] = useState("");

    const handleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const closeEmojiPicker = () => {
        if(showEmojiPicker) {
            setShowEmojiPicker(false);
        }
    }

    const handleEmojiClick = ( event, emojiObject ) => {
        let message = emojiMessage;
        message += event.emoji;
        setEmojiMessage(message);
    }

    const sendMessage = (event) => {
        event.preventDefault();
        if(emojiMessage.length > 0) {
            sendTextMessage(emojiMessage);
            setEmojiMessage("");
        }
    }

    return (
        <Container>
            <div className="btns">
                <div className="emoji">
                    <FontAwesomeIcon 
                        icon={ faFaceSmile }
                        className="smile"
                        onClick={() => handleEmojiPicker()}
                    />
                    {
                        showEmojiPicker && 
                        <EmojiPicker 
                            height={400}
                            width={300}
                            onEmojiClick={( event, emojiObject ) => handleEmojiClick(event, emojiObject)}
                            theme="dark"
                            className="emoji-picker-react"
                        />
                    }
                </div>
            </div>
            <form 
                className="input"
                onSubmit={(event) => sendMessage(event)}
            >
                <input
                    type="text"    
                    placeholder="Type a message"
                    className="text"
                    onChange={(event) => setEmojiMessage(event.target.value)}
                    onClick={() => closeEmojiPicker()}
                    value={emojiMessage}
                />
                <button 
                    className="submit"
                >
                    <FontAwesomeIcon 
                        icon={faPaperPlane} 
                        className="send"
                    />
                </button>
            </form>
        </Container>
    )
} 

const Container = styled.div`
    background-color: transparent;
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    padding: 1rem;
    border-top: 1px solid white;
    background-color: rgba(0, 0, 0, 0.35);
    .btns {
        margin-left: 0.7rem;
        .emoji {
            position: relative;
            .smile {
                height: 30px;
                cursor: pointer;
                color: #E19C2B;
                &:active {
                    scale: 0.9;
                }
            }
            .emoji-picker-react {
                position: absolute;
                top: -420px;
                box-shadow: 0 5px 10px #f0f0f0;
            }
        }
    }
    .input {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        .text {
            height: 50px;
            width: 90%;
            margin-right: 2rem;
            padding: 1rem;
            font-size: 18px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border: 0;
            border-radius: 20px;
            outline: none;
            &::placeholder {
                color: white;
            }
        }
        .submit {
            background-color: transparent;
            border: 0;
            .send {
                height: 20px;
                width: 20px;
                cursor: pointer;
                color: white;
                &:active { 
                    scale: 0.9;
                }
            }
        }
    }
`;