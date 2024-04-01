import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import bgImage from "../assets/bgimage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = () => setChecked(!isChecked);

  useEffect(() => {
    if (localStorage.getItem("snaptalk-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleValidation = () => {
    const { username, password } = values;

    if (username === "") {
      toast.error("Username Is Required");
      return false;
    } else if (password === "") {
      toast.error("Password Is Required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (!data.status) {
        toast.error(data.msg);
      }
      if (data.status) {
        localStorage.setItem("snaptalk-user", JSON.stringify(data.currentUser));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="container h-screen w-screen flex flex-col justify-center items-center text-black bg-[#E6E2FE]">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="h-4/5 w-8/12 flex justify-center items-center rounded-3xl bg-white overflow-hidden"
      >
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#745BF3] to-[#b8aefd] absolute top-[45px] left-[210px]" />
        <div className="h-full w-full flex justify-center items-center rounded-3xl bg-white overflow-hidden z-10">
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="">
              <h2 className="text-4xl text-center font-extrabold mb-2">
                Login
              </h2>
            </div>
            <input
              type="text"
              name="username"
              min="3"
              className="h-10 w-[300px] bg-[#f3f1ff] px-5 py-3 mt-5 rounded-2xl placeholder:text-[#474747] font-medium focus:outline-none focus:border-transparent focus:bg-[#d9d3ff]"
              placeholder="Username"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="h-10 w-[300px] bg-[#f3f1ff] px-5 py-3 mt-5 rounded-2xl placeholder:text-[#474747] font-medium focus:outline-none focus:border-transparent focus:bg-[#d9d3ff]"
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="absolute top-8 left-[270px]"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <label className="font-bold text-sm inline-flex items-center mt-2">
              <input
                type="checkbox"
                className="transition duration-300 ease-in-out"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-1">Remember Me?</span>
            </label>

            <button
              type="submit"
              className="mt-8 mb-5 px-4 py-3 bg-gradient-to-r from-[#8776f3] to-[#5e48ef] rounded-xl  active:scale-95"
            >
              <span className="text-white font-bold">Sign In</span>
            </button>
            <span className="font-semibold">
              New to SnapTalk?{" "}
              <Link to="/register" className="text-[#745BF3] font-bold">
                Sign Up Now
              </Link>
            </span>
          </div>
          <div className="rectangle w-full h-full flex justify-center items-center">
            <div className="h-3/5 w-3/5 backdrop-blur-sm rounded-3xl bg-white bg-opacity-10 shadow-white shadow-sm">
              <img
                alt="Background"
                className="w-full h-full translate-x-20"
                src={bgImage}
              />
            </div>
          </div>
        </div>
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-[#ffffff] to-[#c4c4c4] absolute top-[650px] left-[1235px]" />
      </form>
    </div>
  );
}
