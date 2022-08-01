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
  loggedEmail: "dan@gmail.com",
  loggedUser: {},
  teachersData: [],
  matchedUser: {},
  rejectedUser: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MATCHED_TEACHER":
      const matchedUser = action.payload;
      return { ...state, matchedUser: matchedUser, teachersData: state.teachersData.filter((x) => x !== matchedUser) };
    case "SET_REJECTED_TEACHER":
      const rejectedTeacher = action.payload;
      return { ...state, rejectedTeacher: rejectedTeacher, teachersData: state.teachersData.filter((x) => x !== rejectedTeacher) };
    case "SET_USERS_DATA":
      const teachers = action.payload;
      return { ...state, teachersData: teachers };
    case "SET_LOGGED_USER_DATA":
      const user = action.payload;
      console.log("OIJWDIOQWJDOIWQJD", user);
      return { ...state, loggedUser: user };
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/logged_user/${state.loggedEmail}`)
      .then((response) => {
        console.log(12323123131, response.data);
        dispatch({ type: "SET_LOGGED_USER_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));

    axios
      .get(`${serverUrl}/users/${state.loggedEmail}`)
      .then((response) => {
        dispatch({ type: "SET_USERS_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (state.matchedUser && state.loggedUser) {
      axios
        .post(`${serverUrl}/matches/create`, {
          uid1: state.loggedUser._id,
          uid2: state.matchedUser._id,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [state.matchedUser]);

  useEffect(() => {
    if (state.rejectedTeacher && state.loggedUser) {
      axios
        .post(`${serverUrl}/rejections/create`, {
          uid: state.loggedUser._id,
          tid: state.rejecteduser._id,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [state.rejectedTeacher]);

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
