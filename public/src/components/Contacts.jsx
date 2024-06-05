import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import Logout from "./Logout";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [foundContacts, setFoundContacts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const searchDesiredUser = (user) => {
    setCurrentSelected("");
    const matchedContacts = contacts.filter((contact) => {
      return contact.username.toLowerCase().includes(user.toLowerCase());
    });
    setFoundContacts(matchedContacts);
  };

  useEffect(() => {
    searchDesiredUser(searchUser);
  }, [searchUser]);

  const clearSearch = () => {
    setSearchUser("");
    setFoundContacts([]);
  };

  const popWarning = () => window.alert(`You are about to be logged out`);

  return (
    <>
      {currentUserImage && currentUsername && (
        <Container>
          <div className="brand">
            <div className="flex1">
              <img src={Logo} alt="Logo" />
              <h6>SnapTalk</h6>
            </div>
          </div>
          <div className="search-button">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="f-awsm1"
              style={{ color: "#222629" }}
            />
            <input
              className="search"
              placeholder="Search for a SnapTalker"
              value={searchUser}
              onChange={(event) => setSearchUser(event.target.value)}
            ></input>
            <FontAwesomeIcon
              icon={faXmark}
              className="f-awsm2"
              onClick={() => clearSearch()}
              style={{ color: "#222629" }}
            />
          </div>
          {searchUser !== "" ? (
            <div className="contacts">
              {" "}
              {foundContacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact 
                                                ${
                                                  index === currentSelected
                                                    ? "selected"
                                                    : ""
                                                }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64, ${contact.avatarImage}`}
                        alt="Avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    key={contact._id}
                    className={`contact 
                                                    ${
                                                      index === currentSelected
                                                        ? "selected"
                                                        : ""
                                                    }`}
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64, ${contact.avatarImage}`}
                        alt="Avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64, ${currentUserImage}`}
                alt="Avatar"
              />
            </div>
            <div className="username">
              <h1>{currentUsername}</h1>
            </div>
            <Logout className="logout" />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 5% 11% 72%;
  overflow: hidden;
  background-color: #222629;
  .brand {
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin: 10px 0px 0px 0px;
    .flex1 {
      display: flex;
      gap: 0.5rem;
      img {
        height: 21px;
        width: 21px;
        margin-left: 10px;
      }
      h6 {
        font-size: 18px;
      }
    }
  }

  .search-button {
    height: 65px;
    display: flex;
    align-items: center;
    background-color: #222629;
    .f-awsm1 {
      height: 20px;
      padding: 10px;
      background-color: rgba(107, 110, 112, 0.8);
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      margin-left: 1rem;
    }
    .search {
      height: 40px;
      width: calc(234px - 1rem);
      padding: 15px 5px 15px 5px;
      gap: 1rem;
      border: 0;
      background-color: rgba(107, 110, 112, 0.8);
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      &::placeholder {
        color: #ffffff;
        font-weight: 500;
      }
    }
    .search:focus {
      outline: none;
    }
    .f-awsm2 {
      height: 20px;
      padding: 10px;
      background-color: rgba(107, 110, 112, 0.8);
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      cursor: pointer;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    margin: 0 0rem 0 1rem;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #5d6062;
        border: 1px solid #303233;
        border-radius: 3px;
      }
    }
    .contact {
      background-color: rgba(237, 65, 52, 0.6);
      height: 4rem;
      width: calc(310px - 1rem);
      border-radius: 10px;
      cursor: pointer;
      padding: 20px;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      z-index: 0;
      .avatar {
        img {
          height: 40px;
          width: 40px;
        }
      }
      .username {
        h3 {
          font-size: 18px;
          font-weight: 200;
        }
      }
    }
    .selected {
      background-color: rgba(237, 65, 52, 1);
    }
    .contact:first-child {
      margin-top: 0;
    }
    .contact:last-child {
      margin-bottom: 1rem;
    }
  }

  .current-user {
    background-color: rgba(107, 110, 112, 0.8);
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 2.5rem;
        margin-left: 10px;
        border: 3px solid #45f03c;
        border-radius: 50%;
      }
    }
    .username {
      h1 {
        color: white;
        font-size: 20px;
      }
    }
  }
`;
