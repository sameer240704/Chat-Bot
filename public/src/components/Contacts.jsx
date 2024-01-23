import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, currentUser }) {

    const [ currentUsername, setCurrentUsername ] = useState("");

    const [ currentUserImage, setCurrentUserImage ] = useState("");

    const [ currentSelected, setCurrentSelected ] = useState("");

    useEffect(() => {
        if(currentUser) {
            setCurrentUsername(currentUser.username);
            setCurrentUserImage(currentUser.avatarImage);
        }  
    }, [ currentUser ]);

    const changeCurrentChat = ( index, contact ) => {}

    return (
        <>
            {
                currentUserImage && currentUsername && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="Logo" />
                            <h3>SnapTalk</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map(( contact, index ) => {
                                    return (
                                        <div 
                                            className={`contact 
                                                ${index === currentSelected ? "selected" : "" }`} 
                                                key={index} 
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
    grid-template-columns: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    
`;  