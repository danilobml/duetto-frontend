import "./Swipe.css";
import { useState, useEffect } from "react";

import TinderCard from "react-tinder-card";
import Header from "../Header/Header";
import serverUrl from "../../serverUrl";

const axios = require("axios");

const onSwipe = (direction) => {
  console.log("You swiped: " + direction);
};

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + " left the screen");
};

function Swipe() {
  const [teachersData, setTeachersData] = useState();

  useEffect(() => {
    axios
      .get(`${serverUrl}`)
      .then((response) => setTeachersData(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(teachersData);

  if (!teachersData) {
    return "Loading...";
  }

  return (
    <div className="main-container">
      <Header className="header" />
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen("fooBar")} preventSwipe={["right", "left"]}>
        <div className="card-container">
          <img src={teachersData[0].profile_picture} alt="user" className="user-pic" />
          <h4>{teachersData[0].name}</h4>
          <h4>Teaches:</h4>
          <ul>
            {teachersData[0].instruments.map((instrument, index) => {
              return <li key={index}>{instrument}</li>;
            })}
            <h5>{teachersData[0].location}</h5>
          </ul>
          <h4>Styles</h4>
          <ul>
            {teachersData[0].styles.map((style, index) => {
              return <li key={index}>{style}</li>;
            })}
            <h4>Located in: {teachersData[0].location}</h4>
          </ul>
        </div>
      </TinderCard>
    </div>
  );
}

export default Swipe;
