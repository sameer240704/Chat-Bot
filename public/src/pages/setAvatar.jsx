import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Typewriter from "typewriter-effect";
import styled from "styled-components";
import { Buffer } from "buffer";
import bgImage from '../assets/bgimage.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { avatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";

export default function Avatar() {

    const api = "https://api.multiavatar.com/83983748";
    const navigate = useNavigate();

    const [ avatars, setAvatars ] = useState([]);

    const [ isLoading, setIsLoading ] = useState(true);

    const [ selectedAvatar, setSelectedAvatar ] = useState(undefined);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme:"dark",
    };

    const redirect = async () => {
        if(!localStorage.getItem("snaptalk-user")) {
            navigate("/login")
        }
    };

    useEffect(() => {
        redirect();
    }, []);

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error("Please Select an Avatar", toastOptions);
        }
        else {
            try {
                const userJSON = localStorage.getItem("snaptalk-user");

                if(!userJSON) {
                    toast.error("User Not Found", toastOptions);
                }

                const user = await JSON.parse(userJSON);
                
                const { data }  = await axios.post(`${avatarRoute}/${user._id}`, 
                    { image: avatars[selectedAvatar] }
                );

                console.log(data);

                if(data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("snaptalk-user", JSON.stringify(user));
                    navigate("/");
                }
                else {
                    toast.error(`Error Setting Avatar. Please Try Again`, toastOptions);
                }
            }
            catch(err) {
                console.log(`Error Parsing JSON: ${err.message}`);
            }
        }
    };

    const fetchAvatars = async () => {
        try {
            const data = [];
            for (let i = 0; i < 5; i += 1) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = Buffer.from(image.data, "binary")
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }
        catch(err) {
            console.log(`Fetch Avatar Error: ${err.message}`);
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        fetchAvatars();
    }, []);

    return (
        <>
        {
            isLoading ? 
            (<Container>
                <img src={loader} className="loader" alt="Loader" />
            </Container>) : (
            <Container>
                <div className="title">
                    <Typewriter 
                        options={{
                            cursor: "",
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("WELCOME TO SNAPTALK")
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString("PICK AN AVATAR")
                                .start();
                        }}
                    />
                </div>
                <div className="avatars">{
                    avatars.map((avatar, index) => {
                        return (
                            <div 
                                key={index}
                                className={`avatar ${ selectedAvatar === index ? "selected" : ""}`}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img 
                                    src={`data:image/svg+xml;base64,${avatar}`} 
                                    alt="Avatar" 
                                />
                            </div> 
                        )
                    })
                }
                </div>
                <button className="submit" onClick={setProfilePicture}>
                    <span className="circle1"></span>
                    <span className="circle2"></span>
                    <span className="circle3"></span>
                    <span className="circle4"></span>
                    <span className="circle5"></span>
                    <span className="text">SELECT PROFILE PICTURE</span>
                </button>
            </Container>
        )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="dark"
            />
        </>
    )
};

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
                    url(${bgImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    color: #ffffff;
    .title {
        font-size: 5rem;    
        font-weight: 800;
        background: linear-gradient(to right, #111111, #121212, #333333, #353535, #535353, #777777);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
        margin-bottom: 2rem;
    }
    .avatars {
        display: flex;
        gap: 3rem;
        margin: 50px 0px 50px 0px;
        .avatar {
            border: 0.1rem solid transparent;
            border-radius: 5rem;
            padding: 0.4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 7rem;
            }
        }
        .selected {
            box-shadow: 0 0 50px 20px #48abe0;
        }
    }
    button {
        font-weight: bold;
        color: white;
        background-color: #171717;
        padding: 1em 2em;
        border: none;
        border-radius: .6rem;
        margin-top: 20px;
        padding: 15px;
        font-size: 20px;
        margin-bottom: 10px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
    }
      
    button span:not(:nth-child(6)) {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 76px;
        width: 76px;
        background-color: #0c66ed;
        border-radius: 50%;
        transition: .6s ease;
    }
      
    button span:nth-child(6) {
        position: relative;
    }
      
    button span:nth-child(1) {
        transform: translate(-7em, -6.3em);
    }
      
    button span:nth-child(2) {
        transform: translate(-9em, 2.5em);
    }
      
    button span:nth-child(3) {
        transform: translate(-2em, 3.5em);
    }
      
    button span:nth-child(4) {
        transform: translate(4em, 1.6em);
    }
      
    button span:nth-child(5) {
        transform: translate(3em, -6.7em);
    }
      
    button:hover span:not(:nth-child(6)) {
        transform: translate(-50%, -50%) scale(4);
        transition: 1.5s ease;
    }

    .loader {
        height: 500px;
        width: 500px;
    }
`;