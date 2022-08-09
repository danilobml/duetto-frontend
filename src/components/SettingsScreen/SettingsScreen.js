import "./SettingsScreen.css";
import { useState, useContext } from "react";

function SettingsScreen({ dispatch }) {
  const [userInput, setUserInput] = useState();

  console.log(userInput);

  const handleInput = (e) => {
    setUserInput({ filter: e.target.value });
  };

  return (
    <div className="container flex flex-col h-screen mt-12 justify-start p-5 place-content-around">
      <div className="settings mt-12">
        <label for="filters" class="block text-xl font-medium text-gray-900 dark:text-gray-400 text-center">
          Search settings:
        </label>
        <select
          onChange={(e) => {
            handleInput(e);
          }}
          id="filters"
          name="filter"
          class="justify-self-start bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value="">
            No filter
          </option>
          <option value="location">Location</option>
          <option value="online">Online classes</option>
          <option value="in_person">In person classes</option>
          <option value="instruments">Instrument</option>
          <option value="styles">Styles</option>
        </select>
      </div>
      <div>
        <button onClick={() => dispatch({ type: "SET_FILTER", payload: userInput })} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-60">
          Confirm
        </button>
        <a href="/">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-60">Go Match!</button>
        </a>
      </div>
    </div>
  );
}

export default SettingsScreen;
