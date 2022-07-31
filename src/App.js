import "./App.css";
import { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";

import serverUrl from "./serverUrl";
import MatchScreen from "./components/MatchScreen.js/MatchScreen";
import UserProfile from "./components/UserProfile/UserProfile";
import SwipeScreen from "./components/SwipeScreen/SwipeScreen";
import LogInScreen from "./components/LogInScreen/LogInScreen";

const axios = require("axios");

const initialState = {
  logged: true,
  loggedUser: {},
  teachersData: [],
  matches: [],
  rejections: [],
  selectedTeacher: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MATCHED_TEACHER":
      const matchedTeacher = action.payload;
      return { ...state, selectedTeacher: matchedTeacher, teachersData: state.teachersData.filter((x) => x !== matchedTeacher), matches: [...state.matches, matchedTeacher._id] };
    case "SET_REJECTED_TEACHER":
      const rejectedTeacher = action.payload;
      return { ...state, teachersData: state.teachersData.filter((x) => x !== rejectedTeacher), rejections: [...state.rejections, rejectedTeacher._id] };
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
  console.log(state);
  console.log(state.rejections);
  console.log(state.matches);

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
        dispatch({ type: "SET_USER_DATA", payload: response.data[0] });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .patch(`${serverUrl}/user/${state.loggedUser._id}`, {
        key: "matches",
        value: [...state.matches],
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [state.matches]);

  useEffect(() => {
    axios
      .patch(`${serverUrl}/user/${state.loggedUser._id}`, {
        key: "rejections",
        value: [...state.rejections],
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [state.rejections]);

  return (
    <div className="App">
      <UserContext.Provider value={[state, dispatch]}>
        <Routes>
          {!state.logged ? <Route path="/" element={<LogInScreen />} /> : <Route path="/" element={<SwipeScreen dispatch={dispatch} />} />}
          <Route path="/match" element={<MatchScreen />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
