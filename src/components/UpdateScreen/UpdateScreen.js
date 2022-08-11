import "./UpdateScreen.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../serverUrl";
import UserContext from "../UserContext";

const axios = require("axios");

function CreateUser({ dispatch }) {
  const [userInput, setUserInput] = useState({});
  const [userData, setUserData] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedUser();
  }, []);

  function getLoggedUser() {
    axios
      .get(`${serverUrl}/users/logged_user/${loggedUser.email}`)
      .then((response) => {
        dispatch({ type: "SET_LOGGED_USER_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.checked });
  };

  function insertUserData() {
    let instrumentArray = userInput.istruments && userInput.instruments.split(",");
    let stylesArray = userInput.styles && userInput.styles.split(",");
    setUserData({
      name: userInput.name || loggedUser.name,
      role: loggedUser.role,
      email: loggedUser.email,
      password: userInput.password || loggedUser.password,
      age: userInput.age || loggedUser.age,
      phone: userInput.phone || loggedUser.phone,
      location: userInput.location || loggedUser.location,
      instruments: instrumentArray || loggedUser.instruments,
      styles: stylesArray || loggedUser.styles,
      in_person: userInput.in_person || loggedUser.in_person,
      online: userInput.online || loggedUser.online,
      price: userInput.price || loggedUser.price,
      min_price: userInput.min_price || loggedUser.min_price,
      max_price: userInput.max_price || loggedUser.max_price,
      profile_picture: userInput.profile_picture || loggedUser.profile_picture,
      video: userInput.video || loggedUser.video,
      availability: [],
      selections: [],
      rejections: [],
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${serverUrl}/users/${loggedUser._id}`, userData)
      .then((response) => {
        if (response.ok) {
          setShowSuccess(true);
        }
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      });
  };

  return (
    <div className="mt-12">
      >
      {loggedUser && (
        <form onSubmit={(e) => handleSubmit(e)} className="p-10 pb-1 bg-white rounded-xl drop-shadow-sm space-y-3" style={{ width: "97%", maxWidth: "500px" }}>
          <h1 className="text-3xl">Update your profile:</h1>
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="block text-gray-400 dark:text-gray-400">
              Name
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.name} name="name" id="names" />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="block text-gray-400 dark:text-gray-400">
              Email
            </label>
            <input style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="email" value={loggedUser.email} name="email" id="email" readonly />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="block text-gray-400 dark:text-gray-400">
              Password
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="password" placeholder="invisible..." name="password" id="password" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="age" className="block text-gray-400 dark:text-gray-400">
              Age
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder={loggedUser.age} name="age" id="age" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="location" className="block text-gray-400 dark:text-gray-400">
              Location
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.location} name="location" id="location" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="block text-gray-400 dark:text-gray-400">
              Phone
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.phone} name="phone" id="phone" />
          </div>
          {loggedUser.role === "teacher" && (
            <div className="flex flex-col space-y-2">
              <label htmlFor="price" className="block text-gray-400 dark:text-gray-400">
                Price
              </label>
              <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder={loggedUser.price} name="price" id="price" />
            </div>
          )}
          {loggedUser.role === "student" && (
            <>
              <div className="flex flex-col space-y-2">
                <label htmlFor="min_price" className="block text-gray-400 dark:text-gray-400">
                  Min Price
                </label>
                <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder={loggedUser.min_price} name="min_price" id="min_price" />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="max_price" className="block text-gray-400 dark:text-gray-400">
                  Max Price
                </label>
                <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder={loggedUser.max_price} name="max_price" id="max_price" />
              </div>
              <label className="text-sm font-light mr-2" htmlFor="level">
                What's your level*?:
              </label>
              <div className="flex items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id="default-radio-2"
                  type="radio"
                  value="beginner"
                  name="level"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <label htmlFor="default-radio-2" className="ml-2 mr-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                  Beginner
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id="default-radio-1"
                  type="radio"
                  value="intermediate"
                  name="level"
                  className="my-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="default-radio-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Intermediate
                </label>
              </div>
              <div className="flex items-center">
                <input
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  id="default-radio-2"
                  type="radio"
                  value="advanced"
                  name="level"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <label htmlFor="default-radio-2" className="ml-2 mr-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                  Advanced
                </label>
              </div>
            </>
          )}
          <div className="flex flex-col space-y-2">
            <label htmlFor="profile_picture" className="block text-gray-400 dark:text-gray-400">
              Profile Picture
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.profile_picture} name="profile_picture" id="profile_picture" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="video" className="block text-gray-400 dark:text-gray-400">
              Video
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.video} name="video" id="video" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="instruments" className="block text-gray-400 dark:text-gray-400">
              Instruments
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.instruments} name="instruments" id="instruments" />
            <label htmlFor="instruments" className="text-xs mt-0">
              (separated only by a comma)
            </label>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="styles" className="block text-gray-400 dark:text-gray-400">
              Styles
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={loggedUser.styles} name="styles" id="styles" />
            <label htmlFor="styles" className="text-xs mt-0">
              (separated only by a comma)
            </label>
          </div>

          <div className="flex items-center mb-4">
            <label className="text-sm font-light mr-2" htmlFor="role">
              Modality*:
            </label>
            <input onChange={(e) => handleCheckbox(e)} id="online" type="checkbox" name="online" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={loggedUser.online ? true : false} />
            <label htmlFor="online" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Online
            </label>
            <input onChange={(e) => handleCheckbox(e)} id="in_person" type="checkbox" name="in_person" className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={loggedUser.in_person ? true : false} />
            <label htmlFor="in_person" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              In Person
            </label>
          </div>
          {showError && <p className="p-0 m-0 text-sm text-red-600">Error! All mandatory fields must be correctly filled.</p>}
          <p className="p-0 m-0 text-xs">* Mandatory fields</p>
          {showCreate && (
            <a href="/">
              {" "}
              <button className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
                Confirm and Update
              </button>
            </a>
          )}
        </form>
      )}
      {!showCreate && !showSuccess && (
        <button
          onClick={() => {
            insertUserData();
            setShowCreate(true);
          }}
          className="w-sm px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
        >
          Insert Data
        </button>
      )}
      {showCreate && !showSuccess && (
        <button onClick={() => setShowCreate(false)} className="size-sm px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in">
          Edit
        </button>
      )}
      {showSuccess && <h1 className="text-3xl">profile successfully updated!</h1>}
      <a href="/" className="link-login text-xs">
        <p>Back</p>
      </a>
    </div>
  );
}

export default CreateUser;
