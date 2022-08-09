import "./CreateUser.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../serverUrl";
import UserContext from "../UserContext";

const axios = require("axios");

function CreateUser({ dispatch }) {
  const [userInput, setUserInput] = useState({});
  const [userData, setUserData] = useState({});
  const [showCreate, setShowCreate] = useState(false);
  const [showError, setShowError] = useState(false);
  const [role, setRole] = useState("");
  const data = useContext(UserContext);
  const newEmail = data[0].newUserEmail;

  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.checked });
  };

  console.log(userInput);

  function insertUserData() {
    let instrumentArray = userInput.istruments && userInput.instruments.split(",");
    let stylesArray = userInput.styles && userInput.styles.split(",");
    setUserData({
      name: userInput.name,
      role: userInput.role,
      email: newEmail,
      password: userInput.password,
      age: userInput.age || 0,
      phone: userInput.phone,
      location: userInput.location,
      instruments: instrumentArray,
      styles: stylesArray,
      in_person: userInput.in_person,
      online: userInput.online,
      price: userInput.price || 0,
      min_price: userInput.min_price || 0,
      max_price: userInput.max_price || 0,
      profile_picture: userInput.video,
      video: userInput.video,
      availability: [],
      selections: [],
      rejections: [],
    });
  }

  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${serverUrl}/users/create`, userData)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      });
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="p-10 pb-1 bg-white rounded-xl drop-shadow-sm space-y-3" style={{ width: "97%", maxWidth: "500px" }}>
        <h1 className="text-3xl">Create new account:</h1>
        <div class="flex items-center mb-4">
          <label className="text-sm font-light mr-2" htmlFor="role">
            Are you a*?:
          </label>
          <div class="flex items-center">
            <input
              onChange={(e) => {
                handleInput(e);
                setRole(e.target.value);
              }}
              id="default-radio-2"
              type="radio"
              value="teacher"
              name="role"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <label for="default-radio-2" class="ml-2 mr-2  text-sm font-medium text-gray-900 dark:text-gray-300">
              Teacher
            </label>
          </div>
          <input
            onChange={(e) => {
              handleInput(e);
              setRole(e.target.value);
            }}
            id="default-radio-1"
            type="radio"
            value="student"
            name="role"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Student
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <label for="name" class="block text-gray-400 dark:text-gray-400">
            Name
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder="Your Name*" name="name" id="names" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="email" class="block text-gray-400 dark:text-gray-400">
            Email
          </label>
          <input style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="email" value={newEmail} name="email" id="email" readonly />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="password" class="block text-gray-400 dark:text-gray-400">
            Password
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="password" placeholder="Your Password*" name="password" id="password" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="age" class="block text-gray-400 dark:text-gray-400">
            Age
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder="Age (optional)" name="age" id="age" />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="location" class="block text-gray-400 dark:text-gray-400">
            Location
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder="Location*" name="location" id="location" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="phone" class="block text-gray-400 dark:text-gray-400">
            Phone
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder="Your phone number" name="phone" id="phone" />
        </div>
        {role === "teacher" && (
          <div className="flex flex-col space-y-2">
            <label for="price" class="block text-gray-400 dark:text-gray-400">
              Price
            </label>
            <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder="Price € *" name="price" id="price" />
          </div>
        )}
        {role === "student" && (
          <>
            <div className="flex flex-col space-y-2">
              <label for="min_price" class="block text-gray-400 dark:text-gray-400">
                Min Price
              </label>
              <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder="Min Price €" name="min_price" id="min_price" />
            </div>
            <div className="flex flex-col space-y-2">
              <label for="max_price" class="block text-gray-400 dark:text-gray-400">
                Max Price
              </label>
              <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="number" placeholder="Max Price €" name="max_price" id="max_price" />
            </div>
          </>
        )}
        <div className="flex flex-col space-y-2">
          <label for="profile_picture" class="block text-gray-400 dark:text-gray-400">
            Profile Picture
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder="Link to your profile pic*" name="profile_picture" id="profile_picture" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="video" class="block text-gray-400 dark:text-gray-400">
            Video
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder="Link to your demo video*" name="video" id="video" required />
        </div>
        <div className="flex flex-col space-y-2">
          <label for="instruments" class="block text-gray-400 dark:text-gray-400">
            Instruments
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={role === "teacher" ? "Instruments you teach" : "Instruments you play"} name="instruments" id="instruments" />
          <label htmlFor="instruments" className="text-xs mt-0">
            (separated only by a comma)
          </label>
        </div>
        <div className="flex flex-col space-y-2">
          <label for="styles" class="block text-gray-400 dark:text-gray-400">
            Styles
          </label>
          <input onInput={(e) => handleInput(e)} style={{ width: "100%", maxWidth: "340px" }} className="w-96 px-3 py-1 rounded-md border border-slate-400" type="text" placeholder={role === "teacher" ? "Styles you teach" : "Styles you play"} name="styles" id="styles" />
          <label htmlFor="styles" className="text-xs mt-0">
            (separated only by a comma)
          </label>
        </div>
        <div class="flex items-center mb-4">
          <label className="text-sm font-light mr-2" htmlFor="role">
            Modality*:
          </label>
          <input onChange={(e) => handleCheckbox(e)} id="online" type="checkbox" name="online" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="online" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Online
          </label>
          <input onChange={(e) => handleCheckbox(e)} id="in_person" type="checkbox" name="in_person" className="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label for="in_person" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            In Person
          </label>
        </div>
        {showError && <p className="p-0 m-0 text-sm text-red-600">Error! All mandatory fields must be correctly filled.</p>}
        <p className="p-0 m-0 text-xs">* Mandatory fields</p>
        {showCreate && (
          <button className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
            Confirm and Create
          </button>
        )}
      </form>
      {!showCreate && (
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
      {showCreate && (
        <button onClick={() => setShowCreate(false)} className="size-sm px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in">
          Edit
        </button>
      )}
      <a href="/" className="link-login text-xs">
        <p>Return to login</p>
      </a>
    </div>
  );
}

export default CreateUser;
