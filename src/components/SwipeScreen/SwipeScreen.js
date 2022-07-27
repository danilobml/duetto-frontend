import "./SwipeScreen.css";
import { useContext } from "react";
import TinderCard from "react-tinder-card";
import { useNavigate } from "react-router-dom";
import { Markup } from "react-render-markup";

import UserContext from "../UserContext";
import Header from "../Header/Header";

function SwipeScreen({ dispatch }) {
  const data = useContext(UserContext);

  console.log(data);

  const teachersData = data[0].teachersData;

  const navigate = useNavigate();

  const swiped = (direction, teacherName) => {
    if (direction === "right") {
      const teacher = teacherName;
      dispatch({ type: "SET_TEACHER", payload: teacher });
      navigate("/match");
    }
    // if (direction === "left") {
    //   const dataTeacher = teacherData.name;
    //   dispatch({ type: "SET_TEACHER", payload: dataTeacher });
    //   navigate("/match");
    // }
    console.log(direction, teacherName);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  if (!teachersData) {
    return "Loading...";
  }

  return (
    <div className="main-container">
      <Header className="head" />
      <div className="cardContainer">
        {teachersData &&
          teachersData.map((teacher) => (
            <TinderCard className="swipe" key={teacher._id} onSwipe={(dir) => swiped(dir, teacher.name)} onCardLeftScreen={() => console.log(`${teacher.name} is out of frame`)} preventSwipe={["up", "down"]}>
              <iframe style={{ position: "fixed" }} width="90%" height="550px" src={`https://www.youtube.com/embed/${teacher.video}?modestbranding=1&autohide=1&showinfo=0&controls=0&fs=0`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"></iframe>
              <h4 id="name">{teacher.name}</h4>
              <h4>Teaches:</h4>
              <ul>
                {teacher.instruments.map((instrument, index) => {
                  return <li key={index}>{instrument}</li>;
                })}
              </ul>
              <h4>Styles: </h4>
              <ul>
                {teacher.styles.map((style, index) => {
                  return <li key={index}>{style}</li>;
                })}
              </ul>
              <h4>Located in: {teacher.location}</h4>
              <h4>
                Classes: {teacher.online && "Online"} {teacher.online && teacher.in_person && "/"} {teacher.in_person && "In person"}
              </h4>
              <h4>Price: {teacher.price} Euros/hour</h4>
            </TinderCard>
            //   <TinderCard className="swipe" key={teacher._id} onSwipe={(dir) => swiped(dir, teacher.name)} onCardLeftScreen={() => console.log(`${teacher.name} is out of frame`)} preventSwipe={["up", "down"]}>
            //   <Markup markup={teacher.video} />
            //   <h4 id="name">{teacher.name}</h4>
            //   <h4>Teaches:</h4>
            //   <ul>
            //     {teacher.instruments.map((instrument, index) => {
            //       return <li key={index}>{instrument}</li>;
            //     })}
            //   </ul>
            //   <h4>Styles: </h4>
            //   <ul>
            //     {teacher.styles.map((style, index) => {
            //       return <li key={index}>{style}</li>;
            //     })}
            //   </ul>
            //   <h4>Located in: {teacher.location}</h4>
            //   <h4>
            //     Classes: {teacher.online && "Online"} {teacher.online && teacher.in_person && "/"} {teacher.in_person && "In person"}
            //   </h4>
            //   <h4>Price: {teacher.price} Euros/hour</h4>
            // </TinderCard>
          ))}
      </div>
    </div>
  );
}

export default SwipeScreen;
