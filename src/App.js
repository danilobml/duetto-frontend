import "./App.css";
import { useState, useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";
import SwipeScreen from "./components/Swipe/SwipeScreen";

import serverUrl from "./serverUrl";
import userData from "./data/mockDataLoggedUser.json";
import MatchScreen from "./components/MatchScreen.js/MatchScreen";

const axios = require("axios");

const initialState = {
  loggedUser: userData,
  teachersData: [],
  selectedTeacher: "manny",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TEACHER":
      const dataTeacher = action.payload;
      return { ...state, selectedTeacher: dataTeacher };
    case "SET_TEACHERS_DATA":
      const dataTeachers = action.payload;
      return { ...state, teachersData: dataTeachers };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`${serverUrl}`)
      .then((response) => {
        dispatch({ type: "SET_TEACHERS_DATA", payload: response.data });
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
