import "./SwipeScreen.css";
import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";

import SwipeCard from "../SwipeCard/SwipeCard";
import Header from "../Header/Header";
import CardFooter from "../CardFooter.js/CardFooter";

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);
  const matches = data[0].loggedUser.matches;
  const rejections = data[0].loggedUser.rejections;
  console.log(matches);
  console.log(rejections);
  const teachersData = data[0].teachersData.filter((x) => !matches.includes(x._id) && !rejections.includes(x._id));
  console.log(teachersData);
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(teachersData.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(teachersData.length - 1);
  }, [teachersData]);

  const navigate = useNavigate();

  const childRefs = useMemo(
    () =>
      Array(teachersData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [teachersData.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction, teacher, index) => {
    if (direction === "right") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      const matchedTeacher = teacher;
      dispatch({ type: "SET_MATCHED_TEACHER", payload: matchedTeacher });
      navigate("/match");
    }
    if (direction === "left") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      const rejectedTeacher = teacher;
      dispatch({ type: "SET_REJECTED_TEACHER", payload: rejectedTeacher });
    }
  };

  const canSwipe = currentIndex >= 0;

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < teachersData.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  if (!teachersData) {
    return "Loading...";
  }

  if (teachersData.length === 0) {
    return "No more users available";
  }

  return (
    <div className="main-container">
      <Header className="head" />
      <div className="cardContainer">
        {teachersData &&
          // matches.length &&
          teachersData
            // .filter((teacher) => !matches.includes(teacher._id))
            .map((teacher, index) => (
              <>
                <SwipeCard key={teacher._id} onSwipe={(dir) => swiped(dir, teacher, index)} teacher={teacher} reveal={reveal} index={index} childRefs={childRefs} playing={playing} setPlaying={setPlaying} currentIndex={currentIndex} />
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
