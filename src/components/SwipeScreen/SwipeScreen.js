import "./SwipeScreen.css";
import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";

import SwipeCard from "../SwipeCard/SwipeCard";
import CardFooter from "../CardFooter.js/CardFooter";

import serverUrl from "../../serverUrl";

const axios = require("axios");

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);
  const usersData = data[0].usersData;
  const filteredUsersData = usersData.filter((x) => !data[0].loggedUser.rejections.includes(x._id) && !data[0].loggedUser.selections.includes(x._id));
  const loggedUser = data[0].loggedUser;
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(filteredUsersData.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(filteredUsersData.length - 1);
  }, [filteredUsersData]);

  const navigate = useNavigate();

  const childRefs = useMemo(
    () =>
      Array(filteredUsersData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [filteredUsersData.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  function processNewSelection(user) {
    const newValue = [...loggedUser.selections, user._id];
    axios
      .patch(`${serverUrl}/users/${loggedUser._id}`, {
        key: "selections",
        value: newValue,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  function processNewMatch(user) {
    axios
      .post(`${serverUrl}/results`, {
        uid1: loggedUser._id,
        uid2: user._id,
        status: "MATCH",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  function processNewRejection(user) {
    const newValue = [...loggedUser.rejections, user._id];
    axios
      .patch(`${serverUrl}/users/${loggedUser._id}`, {
        key: "rejections",
        value: newValue,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  const swiped = (direction, user, index) => {
    if (direction === "right") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      if (data[0].loggedUser.selections.includes(user._id) || user.selections.includes(data[0].loggedUser._id)) {
        processNewMatch(user);
        processNewSelection(user);
        dispatch({ type: "SET_ACCEPTED_USER", payload: user });
        dispatch({ type: "SET_MATCHED_USER", payload: user });
        navigate("/match");
      } else {
        processNewSelection(user);
        dispatch({ type: "SET_ACCEPTED_USER", payload: user });
      }
    }
    if (direction === "left") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      processNewRejection(user);
      dispatch({ type: "SET_REJECTED_USER", payload: user });
    }
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < filteredUsersData.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  if (!filteredUsersData) {
    return "Loading...";
  }

  if (filteredUsersData.length === 0) {
    return "No more users available";
  }

  return (
    <div className="main-container">
      <div className="cardContainer">
        {filteredUsersData &&
          // matches.length &&
          filteredUsersData
            // .filter((user) => !matches.includes(user._id))
            .map((user, index) => (
              <>
                <SwipeCard key={user._id} onSwipe={(dir) => swiped(dir, user, index)} user={user} reveal={reveal} index={index} childRefs={childRefs} playing={playing} setPlaying={setPlaying} currentIndex={currentIndex} />
                <div className="footer">
                  <CardFooter reveal={reveal} setReveal={setReveal} swipe={swipe} index={index} playing={playing} setPlaying={setPlaying} />
                </div>
              </>
            ))}
      </div>
    </div>
  );
}

export default SwipeScreen;
