import "./LogInScreen.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../images/logo.png";
import serverUrl from "../../serverUrl";

const axios = require("axios");

function LogInScreen({ dispatch }) {
  const [userInput, setUserInput] = useState({});

  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  console.log(userInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${serverUrl}/auth/login`, userInput)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="flex justify-center w-screen h-6 items-center mt-20 mb-0 p-0">
        <img src={icon} alt="icon duetto" className="icon-login" />
      </div>
      <div className="container mt-0">
        <div className="flex justify-center items-center">
          <form onSubmit={(e) => handleSubmit(e)} className="p-10 bg-white rounded-xl drop-shadow-sm space-y-5" style={{ width: "97%", maxWidth: "500px" }}>
            <h1 className="text-center text-3xl">Login</h1>
            <h2 className="text-center text-xl">If you already have an account:</h2>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="email">
                Email
              </label>
              <input onInput={(e) => handleInput(e)} style={{ width: "100%" }} className="w-96 px-3 py-2 rounded-md border border-slate-400" type="email" placeholder="Your Email" name="email" id="email" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" htmlFor="password">
                Password
              </label>
              <input onInput={(e) => handleInput(e)} style={{ width: "100%" }} className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password" placeholder="Your Password" name="password" id="password" />
            </div>
            <button className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
              Log In
            </button>
            <h2 className="text-center text-xl">Or register a new account:</h2>
            <button onClick={() => navigate("/register")} className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogInScreen;
