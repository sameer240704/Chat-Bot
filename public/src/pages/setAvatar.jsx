import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import styled from "styled-components";
import { Buffer } from "buffer";
import bgImage from '../assets/bgimage.jpg';
import 'react-toastify/dist/ReactToastify.css';
import { avatarRoute } from "../utils/APIRoutes";

export default function Avatar() {

    const api = "https://api.multiavatar.com/45678945";
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

    const setProfilePicture = async () => {};

    // useEffect(async () => {
    //     const data = [];
    //     for(let i = 0 ; i < 4 ; i += 1) {
    //         const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
    //         const buffer = new Buffer(image.data);
    //         data.push(buffer.toString("base64"));
    //     }
    //     setAvatars(data);
    //     setIsLoading(false);
    // })

    const fetchAvatars = async () => {
        const data = [];
        for (let i = 0; i < 20; i += 1) {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const base64Image = btoa(image.data);
          data.push(base64Image);
        }
        setAvatars(data);
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchAvatars();
      }, []);

    return (
        <>
            <Container>
                <div className="title">
                    <h1>PICK AN AVATAR</h1>
                </div>
                <div className="avatars">{
                    avatars.map((avatar, index) => {
                        return (
                            <div 
                                className={`avatar ${ selectedAvatar === index ? "selected" : ""}`}
                                onClick={() => setSelectedAvatar(index)}
                            >
                                <img src={`data:image/svg+xml;base64,${avatar}`} alt="Avatar" />
                            </div> 
                        )
                    })
                }
                </div>
            </Container>
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
    
`;