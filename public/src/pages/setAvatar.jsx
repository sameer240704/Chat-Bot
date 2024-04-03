import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Typewriter from "typewriter-effect";
import { Buffer } from "buffer";
import { avatarRoute } from "../utils/APIRoutes";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

export default function Avatar() {
  const api = "https://api.multiavatar.com/83983748";
  const navigate = useNavigate();

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [userModal, setUserModal] = useState(false);

  useEffect(() => {
    const redirect = async () => {
      const userJSON = localStorage.getItem("snaptalk-user");
      if (!userJSON) {
        navigate("/login");
      }
    };

    redirect();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === "") {
      toast.error("Please Select an Avatar");
    } else {
      try {
        const userJSON = localStorage.getItem("snaptalk-user");

        if (!userJSON) {
          toast.error("User Not Found");
        }

        const user = await JSON.parse(userJSON);

        const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("snaptalk-user", JSON.stringify(user));
          navigate("/");
        } else {
          toast.error(`Error Setting Avatar. Please Try Again`);
        }
      } catch (err) {
        console.log(`Error Parsing JSON: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const data = [];
        for (let i = 0; i < 5; i += 1) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(image.data, "binary");
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (err) {
        console.log(`Fetch Avatar Error: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const generateUserModal = (event) => {
    event.preventDefault();
    setUserModal(!userModal);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="h-screen bg-[#E6E2FE] flex flex-col justify-center items-center relative">
        <div className="text-5xl font-extrabold">
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
        <div className="h-[200px] flex justify-center items-center gap-10 mt-10">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`h-[100px] w-[100px] flex transition-all duration-200 ${
                selectedAvatar === index
                  ? "h-[180px] w-[180px] rounded-full shadow-lg shadow-black"
                  : "h-[150px] w-[150px]"
              }`}
              onClick={() => setSelectedAvatar(index)}
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="Avatar" />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 mb-5 px-4 py-3 bg-gradient-to-r from-[#8776f3] to-[#5e48ef] rounded-xl shadow-md shadow-black active:scale-95"
          onClick={setProfilePicture}
        >
          <span className="text-white font-bold">
            CHOOSE YOUR DIGITAL DOPPELGANGER
          </span>
        </button>
        <button
          type="submit"
          className="mb-5 px-4 py-3 text-white font-bold uppercase bg-gradient-to-r from-[#8776f3] to-[#5e48ef] rounded-xl shadow-md shadow-black active:scale-95"
          onClick={generateUserModal}
        >
          Generate a User Id
        </button>
      </div>
      {userModal ? <Modal /> : null}
    </>
  );
}
