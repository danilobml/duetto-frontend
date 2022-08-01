import "./SwipeScreen.css";
import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";

import SwipeCard from "../SwipeCard/SwipeCard";
import Header from "../Header/Header";
import CardFooter from "../CardFooter.js/CardFooter";

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);
  let usersData = data[0].usersData;
  console.log(usersData);
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(usersData.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(usersData.length - 1);
  }, [usersData]);

  const navigate = useNavigate();

  const childRefs = useMemo(
    () =>
      Array(usersData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [usersData.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction, user, index) => {
    if (direction === "right") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      const matchedUser = user;
      dispatch({ type: "SET_MATCHED_USER", payload: matchedUser });
      navigate("/match");
    }
    if (direction === "left") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      const rejectedUser = user;
      dispatch({ type: "SET_REJECTED_USER", payload: rejectedUser });
    }
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < usersData.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  if (!usersData) {
    return "Loading...";
  }

  if (usersData.length === 0) {
    return "No more users available";
  }

  return (
    <div className="main-container">
      <Header className="head" />
      <div className="cardContainer">
        {usersData &&
          // matches.length &&
          usersData
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
