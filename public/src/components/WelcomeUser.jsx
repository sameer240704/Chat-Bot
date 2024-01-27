import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import Logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function WelcomeUser() {

    const [ userName, setCurrentUserName ] = useState("");

    useEffect(() => {
        const getUser = async () => {
            setCurrentUserName(
                await JSON.parse(localStorage.getItem("snaptalk-user")).username
            );
        }

        getUser();
    }, []);

    return (
        <Container>
            <img src={Logo} alt="Logo"/>
            <h1>SnapTalk</h1>
            <div className="title">
                <Typewriter 
                    options={{
                        cursor: "",
                    }}
                    onInit={(typewriter) => {
                        typewriter
                        .typeString(`Hello, ${ userName }`)
                        .pauseFor(2000)
                        .typeString(`<br/>Click on a chat to start conversation`)
                        .start();
                    }}
                />
            </div>
            <footer className="footer">
                <FontAwesomeIcon icon={ faLock } />
                <h5>End-to-end encrypted</h5>
            </footer>   
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        height: 4rem;
        width: 4rem;
        margin-bottom: .5rem;
    }
    h1 {
        font-size: 30px;
        margin-bottom: 1rem;
    }
    .title {
        height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
    }
    .footer {
        display: flex;
        align-items: center;
        gap: .5rem;
        position: absolute;
        top: 42.7rem;
    }
`;