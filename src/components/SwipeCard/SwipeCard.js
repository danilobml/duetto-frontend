import "./SwipeCard.css";
import TinderCard from "react-tinder-card";
import ReactPlayer from "react-player";

function SwipeCard({ childRefs, onSwipe, teacher, reveal, index, playing, setPlaying }) {
  return (
    <>
      <div
        className="overlay-play"
        style={{ zIndex: 9999 }}
        onClick={() => {
          setPlaying(!playing);
        }}
      ></div>
      <TinderCard className="swipe" ref={childRefs[index]} onSwipe={onSwipe} preventSwipe={["up", "down"]}>
        <div className="overlay-div" style={{ borderRadius: "40px", position: "fixed", color: "white", zIndex: 1000, width: "90%", height: "550px" }}>
          <h4 id="name">{teacher.name}</h4>
          {reveal ? (
            <div className="info-hidden">
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
            </div>
          ) : (
            ""
          )}
        </div>
        {index < 2 ? <ReactPlayer playing={playing} style={{ borderRadius: "40px", position: "fixed", maxWidth: "330px", minWidth: "330px" }} height="550px" url={`https://www.youtube.com/embed/${teacher.video}?controls=0&showinfo=0`} id="video-player" /> : ""}
      </TinderCard>
    </>
  );
}

export default SwipeCard;
