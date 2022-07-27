import "./App.css";
import { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";
import SwipeScreen from "./components/SwipeScreen/SwipeScreen";

import serverUrl from "./serverUrl";
import MatchScreen from "./components/MatchScreen.js/MatchScreen";

const axios = require("axios");

const initialState = {
  loggedUser: {},
  teachersData: [],
  selectedTeacher: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEACHER":
      const teacher = action.payload;
      return { ...state, selectedTeacher: teacher };
    case "SET_TEACHERS_DATA":
      const teachers = action.payload;
      return { ...state, teachersData: teachers };
    case "SET_USER_DATA":
      const user = action.payload;
      return { ...state, loggedUser: user };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`${serverUrl}/teachers`)
      .then((response) => {
        dispatch({ type: "SET_TEACHERS_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));

    axios
      .get(`${serverUrl}/user`)
      .then((response) => {
        console.log(response);
        dispatch({ type: "SET_USER_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={[state, dispatch]}>
        <Routes>
          <Route path="/" element={<SwipeScreen dispatch={dispatch} />} />
          <Route path="/match" element={<MatchScreen />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
