import "./SettingsScreen.css";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import serverUrl from "../../serverUrl";
const axios = require("axios");

function SettingsScreen({ dispatch }) {
  const [userInput, setUserInput] = useState();
  const data = useContext(UserContext);
  const handleInput = (e) => {
    setUserInput({ filters: e.target.value });
    console.log(e.target.value);
  };

  function updateMatches() {
    console.log(
      `${serverUrl}/users/${data[0].loggedEmail}/?f=${data[0].filters
        .filter((f) => f.checked)
        .map((f) => f.value)
        .join(",")}`
    );
    axios
      .get(
        `${serverUrl}/users/${data[0].loggedEmail}/?f=${data[0].filters
          .filter((f) => f.checked)
          .map((f) => f.value)
          .join(",")}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "SET_USERS_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container flex flex-col h-screen mt-12 justify-start p-5 place-content-around">
      <div className="settings mt-12">
        <label for="filters" class="mb-12 block text-2xl font-medium text-gray-900 dark:text-gray-400 text-center">
          Search settings:
        </label>
        <form
          onChange={(e) => {
            handleInput(e);
          }}
          id="filters"
          name="filter"
          class="justify-self-start bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {data[0] ? (
            <>
              {data[0].filters.map((f, i) => (
                <>
                  <input key={i} type="checkbox" value={f.value} onChange={() => dispatch({ type: "SET_FILTERS", payload: data[0].filters.map((f, j) => (i === j ? { ...f, checked: !f.checked } : f)) })} checked={f.checked} /> {f.label} <br />
                </>
              ))}
            </>
          ) : (
            ""
          )}
        </form>
      </div>
      <div>
        <button onClick={updateMatches} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-32">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

export default SettingsScreen;
