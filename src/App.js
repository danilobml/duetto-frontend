import "./App.css";
import { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";

import serverUrl from "./serverUrl";
import MatchScreen from "./components/MatchScreen/MatchScreen";
import MatchesScreen from "./components/MatchesScreen/MatchesScreen";
import UserProfile from "./components/UserProfile/UserProfile";
import SwipeScreen from "./components/SwipeScreen/SwipeScreen";
import LogInScreen from "./components/LogInScreen/LogInScreen";
import TimeScreen from "./components/TimeScreen/TimeScreen";
import SettingsScreen from "./components/SettingsScreen/SettingsScreen";
import Header from "./components/Header/Header";

const axios = require("axios");

const initialState = {
  logged: true,
  loggedEmail: "dan@gmail.com",
  loggedUser: {},
  usersData: [],
  loggedUserMatches: [],
  rejectedUser: {},
  acceptedUser: {},
  matchedUser: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACCEPTED_USER":
      const acceptedUser = action.payload;
      return { ...state, acceptedUser: acceptedUser, usersData: state.usersData.filter((x) => x !== acceptedUser) };
    case "SET_MATCHED_USER":
      const matchedUser = action.payload;
      return { ...state, matchedUser: matchedUser, usersData: state.usersData.filter((x) => x !== matchedUser) };
    case "SET_REJECTED_USER":
      const rejectedUser = action.payload;
      return { ...state, rejectedUser: rejectedUser, usersData: state.usersData.filter((x) => x !== rejectedUser) };
    case "SET_USERS_DATA":
      const users = action.payload;
      return { ...state, usersData: users };
    case "SET_LOGGED_USER_DATA":
      const user = action.payload;
      return { ...state, loggedUser: user };
    case "SET_USER_MATCHES":
      const matches = action.payload;
      return { ...state, loggedUserMatches: matches };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.loggedUser) {
    console.log(state.acceptedUser);
  }

  useEffect(() => {
    axios
      .get(`${serverUrl}/users/logged_user/${state.loggedEmail}`)
      .then((response) => {
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
    if (state.loggedUser._id) {
      axios
        .get(`${serverUrl}/results/${state.loggedUser._id}`)
        .then((response) => {
          dispatch({ type: "SET_USER_MATCHES", payload: response.data });
        })
        .catch((error) => console.log(error));
    }
  }, [state.loggedUser._id]);

  useEffect(() => {
    if (state.acceptedUser._id && state.loggedUser._id) {
      const newValue = [...state.loggedUser.selections, state.acceptedUser._id];
      axios
        .patch(`${serverUrl}/users/${state.loggedUser._id}`, {
          key: "selections",
          value: newValue,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [state.acceptedUser]);

  useEffect(() => {
    if (state.rejectedUser._id && state.loggedUser._id) {
      const newValue = [...state.loggedUser.rejections, state.rejectedUser._id];
      axios
        .patch(`${serverUrl}/users/${state.loggedUser._id}`, {
          key: "rejections",
          value: newValue,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [state.rejectedUser._id]);

  useEffect(() => {
    if (state.matchedUser._id && state.loggedUser._id) {
      axios
        .post(`${serverUrl}/results`, {
          uid1: state.loggedUser._id,
          uid2: state.matchedUser._id,
          status: "MATCH",
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  }, [state.matchedUser._id]);

  return (
    <div className="App">
      <UserContext.Provider value={[state, dispatch]}>
        <Header />
        <Routes>
          {!state.logged ? <Route path="/" element={<LogInScreen />} /> : <Route path="/" element={<SwipeScreen dispatch={dispatch} />} />}
          <Route path="/match" element={<MatchScreen />} />
          <Route path="/matches" element={<MatchesScreen dispatch={dispatch} />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/time" element={<TimeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
