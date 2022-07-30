import "./SwipeScreen.css";
import React, { useContext, useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";

import SwipeCard from "../SwipeCard/SwipeCard";
import Header from "../Header/Header";
import CardFooter from "../CardFooter.js/CardFooter";

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);
  console.log(data, data[0]);
  const teachersData = data[0].teachersData;
  const [reveal, setReveal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(teachersData.length - 1);
  console.log({ reveal, currentIndex, teachersData });
  const [lastDirection, setLastDirection] = useState();
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    setCurrentIndex(teachersData.length - 1);
  }, [teachersData]);

  console.log(reveal);

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

  const swiped = (direction, teacherName = "none", index) => {
    if (direction === "right") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      const teacher = teacherName;
      dispatch({ type: "SET_TEACHER", payload: teacher });
      navigate("/match");
    }
    if (direction === "left") {
      setLastDirection(direction);
      updateCurrentIndex(index - 1);
      dispatch({ type: "SET_TEACHER", payload: "" });
    }
    console.log(direction, teacherName);
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

  return (
    <div className="main-container">
      <Header className="head" />
      <div className="cardContainer">
        {teachersData &&
          teachersData.map((teacher, index) => (
            <>
              <SwipeCard key={teacher._id} onSwipe={(dir) => swiped(dir, teacher.name, index)} teacher={teacher} reveal={reveal} index={index} childRefs={childRefs} />
              <div className="footer">
                <CardFooter reveal={reveal} setReveal={setReveal} swipe={swipe} index={index} />
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default SwipeScreen;
