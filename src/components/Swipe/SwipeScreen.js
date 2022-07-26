import "./SwipeScreen.css";
import { useContext } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";

import UserContext from "../UserContext";
import Header from "../Header/Header";

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);

  const teacherData = data[0].teachersData[0];

  const navigate = useNavigate();

  const onSwipe = (direction) => {
    if (direction === "right") {
      const dataTeacher = teacherData.name;
      dispatch({ type: "SET_TEACHER", payload: dataTeacher });
      navigate("/match");
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  if (!teacherData) {
    return "Loading...";
  }

  return (
    <div className="main-container">
      <Header className="header" />
      <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen("fooBar")} preventSwipe={["right", "left"]}>
        <div className="card-container">
          <img src={teacherData.profile_picture} alt="user" className="user-pic" />
          <h4>{teacherData.name}</h4>
          <h4>Teaches:</h4>
          <ul>
            {teacherData.instruments.map((instrument, index) => {
              return <li key={index}>{instrument}</li>;
            })}
            <h5>{teacherData.location}</h5>
          </ul>
          <h4>Styles</h4>
          <ul>
            {teacherData.styles.map((style, index) => {
              return <li key={index}>{style}</li>;
            })}
            <h4>Located in: {teacherData.location}</h4>
          </ul>
        </div>
      </TinderCard>
    </div>
  );
}

export default SwipeScreen;
