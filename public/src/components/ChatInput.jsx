import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function ChatInput({ sendTextMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiMessage, setEmojiMessage] = useState("");

  const handleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const closeEmojiPicker = () => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = emojiMessage;
    message += event.emoji;
    setEmojiMessage(message);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (emojiMessage.length > 0) {
      sendTextMessage(emojiMessage);
      setEmojiMessage("");
    }
  };

  return (
    <div className="bg-transparent grid grid-cols-2 items-center px-5 py-4 border-t-2 bg-white">
      <div className="col-span-1 w-[5%]">
        <div className="relative">
          <FontAwesomeIcon
            icon={faFaceSmile}
            className="h-7 cursor-pointer text-[#e19c2b] active:scale-95"
            onClick={() => handleEmojiPicker()}
          />
          {showEmojiPicker && (
            <EmojiPicker
              height={400}
              width={300}
              onEmojiClick={(event, emojiObject) =>
                handleEmojiClick(event, emojiObject)
              }
              className="absolute -top-[420px]"
            />
          )}
        </div>
      </div>
      <form
        className="col-span-1 w-[95%] h-full"
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
        <button className="submit">
          <FontAwesomeIcon icon={faPaperPlane} className="send" />
        </button>
      </form>
    </div>
  );
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
        color: #e19c2b;
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
