import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import bgImage from "../assets/bgimage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("snaptalk-user")) {
      navigate("/");
    }
  }, [navigate]);

  function isDigit(character) {
    return /^\d$/.test(character);
  }

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    } else if (username.length < 3) {
      toast.error("Username is too short");
      return false;
    } else if (email === "") {
      toast.error("Email Required");
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 8 characters");
      return false;
    } else if (password.length >= 8) {
      let digit = 0;
      for (let i = 0; i < password.length; i += 1) {
        if (isDigit(password[i])) {
          digit += 1;
        }
      }
      if (digit < 3) {
        toast.error("Password should contain minimum three digits");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (!data.status) {
        toast.error(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("snaptalk-user", JSON.stringify(data.user));
        navigate("/login");
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
                Register
              </h2>
            </div>
            <input
              type="text"
              name="username"
              className="h-10 w-[300px] bg-[#f3f1ff] px-5 py-3 mt-5 rounded-2xl placeholder:text-[#474747] font-medium focus:outline-none focus:border-transparent focus:bg-[#d9d3ff]"
              placeholder="Username"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <input
              type="email"
              name="email"
              className="h-10 w-[300px] bg-[#f3f1ff] px-5 py-3 mt-5 rounded-2xl placeholder:text-[#474747] font-medium focus:outline-none focus:border-transparent focus:bg-[#d9d3ff]"
              placeholder="Email"
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
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

            <button
              type="submit"
              className="mt-7 mb-4 px-4 py-3 bg-gradient-to-r from-[#8776f3] to-[#5e48ef] rounded-xl shadow-sm shadow-black active:scale-95"
            >
              <span className="text-white font-bold">Sign Up</span>
            </button>
            <span>
              Already have an account?{" "}
              <Link to="/login" className="text-[#745BF3] font-bold">
                Sign In Now
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
