import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Contacts({ contacts, currentUser, changeChat }) {

    const [ currentUsername, setCurrentUsername ] = useState("");

    const [ currentUserImage, setCurrentUserImage ] = useState("");

    const [ currentSelected, setCurrentSelected ] = useState("");

    const [ searchUser, setSearchUser ] = useState("");

    useEffect(() => {
        if(currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }  
    }, [ currentUser ]);

    const changeCurrentChat = ( index, contact ) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

    return (
        <>
            {
                currentUserImage && currentUsername && (
                    <Container>
                        <div className="brand">
                            <div className="flex1">
                                <img src={Logo} alt="Logo" />
                                <h3>SnapTalk</h3>
                            </div>
                            <div className="hr"></div>  
                        </div>
                        <div className="search-button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="f-awsm" />
                            <input 
                                className="search"
                                placeholder="Search for a SnapTalker"
                                value={searchUser}
                                onChange={(event) => setSearchUser(event.target.value)}
                            >
                            </input>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map(( contact, index ) => {
                                    return (                    
                                        <div 
                                            key={contact._id} 
                                            className={`contact 
                                                ${index === currentSelected ? "selected" : "" }`} 
                                            onClick={() => changeCurrentChat(index, contact)}
                                        >
                                            <div className="avatar">
                                                <img 
                                                    src={`data:image/svg+xml;base64, ${ contact.avatarImage }`} 
                                                    alt="Avatar" 
                                                />
                                            </div>
                                            <div className="username">
                                                <h3>
                                                    { contact.username }
                                                </h3>
                                            </div>
                                        </div>
                                    
                                    );
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img 
                                    src={`data:image/svg+xml;base64, ${ currentUserImage }`} 
                                    alt="Avatar" 
                                />
                            </div>
                            <div className="username">
                                <h1>
                                    { currentUsername }
                                </h1>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 7% 10% 73% 10%;
    overflow: hidden;
    background-color: #120d30;

    .brand {
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin: 10px 0px 0px 0px;
        .flex1 {
            display: flex;
            gap: .5rem;
            img {
                height: 20px;
                width: 20px;
                margin-left: 10px;
            }
            h3 {
                font-size: 20px;
            }
        }
        .hr {
            height: 1px;
            width: 400px;
            background-color: white;
            margin-left: 0px;
        }
    }

    .search-button {
        height: 65px;
        display: flex;
        align-items: center;
        background-color: #120d30;
        .f-awsm {
            height: 20px;
            padding: 10px;
            background-color: rgba(233, 234, 235, 0.2);
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            margin-left: 1rem;
        }
        .search {
            height: 40px;
            width: calc(270px - 1rem);
            padding: 15px;
            gap: 1rem;
            border: 0;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            background-color: rgba(233, 234, 235, 0.2);
            font-size: 16px;
            font-weight: 500;
            color: white;
            &::placeholder {
                color: white;
            }
        }
        .search:focus {
            outline: none;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        margin: 0 0rem 0 1rem;
        overflow: auto;
        gap: 1rem;
        &::-webkit-scrollbar {
            width: 0.1rem;
            &-thumb {
                background-color: rgb(233, 234, 235);
                width: 0.1rem;
                border-radius: 10px;
            }
        }
        .contact {
            background-color: rgba(233, 234, 235, 0.5);
            min-height: 4rem;
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
                    font-size: 16px;
                    font-weight: 200;
                }
            }
        }
        .selected {
            background-color: rgba(94, 67, 250, .8);
        }
        .contact:first-child {
            margin-top: 0;
        }
        .contact:last-child {
            margin-bottom: 1rem;
        }
    }

    .current-user {
        background-color: #fce055;
        background-image: linear-gradient(319deg, #fce055 0%, #256eff 37%, #46237a 100%);
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
                margin-left: 10px;
                border: 2px solid #d9d8e3;
                border-radius: 50%;
            }
        }
        .username {
            h1 {
                color: white;
            }
        }
    }
`;  