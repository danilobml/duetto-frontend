import "./App.css";
import { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./components/UserContext";

import serverUrl from "./serverUrl";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import MatchScreen from "./components/MatchScreen/MatchScreen";
import MatchesScreen from "./components/MatchesScreen/MatchesScreen";
import UserProfile from "./components/UserProfile/UserProfile";
import SwipeScreen from "./components/SwipeScreen/SwipeScreen";
import LogInScreen from "./components/LogInScreen/LogInScreen";
import TimeScreen from "./components/TimeScreen/TimeScreen";
import SettingsScreen from "./components/SettingsScreen/SettingsScreen";
import RegisterScreen from "./components/RegisterScreen/RegisterScreen";
import StripeContainer from "./components/Payments/StripeContainer";
import BookingsScreen from "./components/BookingsScreen/BookingsScreen";
import UpdateScreen from "./components/UpdateScreen/UpdateScreen";
import BookingsScreenOne from "./components/BookingsScreen/BookingsScreenOne";
import Booking from "./components/Booking/Booking";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import CreateUser from "./components/CreateUser/CreateUser";

const axios = require("axios");

const initialState = {
  logged: false,
  loggedEmail: null,
  newUserEmail: "",
  token: "",
  loggedUser: {},
  usersData: [],
  loggedUserMatches: [],
  rejectedUser: {},
  acceptedUser: {},
  matchedUser: {},
  bookingTime: "",
  usersBookings: [],
  filters: [
    { value: "location", checked: false, label: "Location" },
    { value: "online", checked: true, label: "Online classes" },
    { value: "in_person", checked: false, label: "In person classes" },
    { value: "instruments", checked: true, label: "Instrument" },
    { value: "styles", checked: false, label: "Styles" },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const loggedEmail = action.payload.email;
      const token = action.payload.token;
      return { ...state, logged: true, loggedEmail: loggedEmail, token };
    case "LOGOUT":
      return { ...state, logged: false, loggedEmail: "", token: "" };
    case "CREATE_USER_EMAIL":
      const newUserEmail = action.payload;
      return { ...state, newUserEmail: newUserEmail };
    case "SET_ACCEPTED_USER":
      const acceptedUser = action.payload;
      return { ...state, acceptedUser: acceptedUser, usersData: state.usersData.filter((x) => x !== acceptedUser) };
    case "SET_MATCHED_USER":
      const matchedUser = action.payload;
      return { ...state, matchedUser: matchedUser };
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
    case "SET_BOOKING_TIME":
      const time = action.payload;
      return { ...state, bookingTime: time };
    case "SET_USERS_BOOKINGS":
      const bookings = action.payload;
      return { ...state, usersBookings: bookings };
    case "SET_FILTERS":
      const filters = action.payload;
      return { ...state, filters };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  useEffect(() => {
    if (state.loggedEmail) {
      getLoggedUser();
      getOtherUsers();
    }
  }, [state.loggedEmail]);

  useEffect(() => {
    if (state.loggedUser._id) {
      getLoggedUserMatches();
    }
  }, [state.loggedUser._id]);

  function getLoggedUser() {
    axios
      .get(`${serverUrl}/users/logged_user/${state.loggedEmail}`)
      .then((response) => {
        dispatch({ type: "SET_LOGGED_USER_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }

  function getOtherUsers() {
    axios
      .get(`${serverUrl}/users/${state.loggedEmail}`)
      .then((response) => {
        dispatch({ type: "SET_USERS_DATA", payload: response.data });
      })
      .catch((error) => console.log(error));
  }

  function getLoggedUserMatches() {
    axios
      .get(`${serverUrl}/results/${state.loggedUser._id}`)
      .then((response) => {
        dispatch({ type: "SET_USER_MATCHES", payload: response.data });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <UserContext.Provider value={[state, dispatch]}>
        {state.logged && <Header />}
        <Routes>
          {!state.logged ? <Route path="/" element={<LogInScreen dispatch={dispatch} />} /> : <Route path="/" element={<SwipeScreen dispatch={dispatch} />} />}
          <Route path="/match" element={<MatchScreen />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/matches" element={<MatchesScreen dispatch={dispatch} />} />
          <Route path="/user" element={<UserProfile dispatch={dispatch} />} />
          <Route path="/time" element={<TimeScreen dispatch={dispatch} />} />
          <Route path="/register" element={<RegisterScreen dispatch={dispatch} />} />
          <Route path="/settings" element={<SettingsScreen dispatch={dispatch} />} />
          <Route path="/update" element={<UpdateScreen />} />
          <Route path="/payment" element={<StripeContainer dispatch={dispatch} />} />
          <Route path="/bookings" element={<BookingsScreen dispatch={dispatch} />} />
          <Route path="/bookings/:id" element={<BookingsScreenOne dispatch={dispatch} />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/create" element={<CreateUser dispatch={dispatch} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
