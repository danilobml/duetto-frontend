import "./SwipeCard.css";
import TinderCard from "react-tinder-card";
import ReactPlayer from "react-player";

function SwipeCard({ childRefs, onSwipe, user, reveal, index, playing, setPlaying, currentIndex }) {
  return (
    <>
      <div
        className="overlay-play"
        style={{ zIndex: 9999 }}
        onClick={() => {
          setPlaying(!playing);
        }}
      ></div>
      <TinderCard className="swipe" ref={childRefs[index]} onSwipe={onSwipe} swipeRequirementType={"position"} swipeThreshold={150} preventSwipe={["up", "down"]}>
        <div className="overlay-div" style={{ borderRadius: "40px", position: "fixed", color: "white", zIndex: 1000, width: "90%", height: "550px" }}>
          <h4 id="name">{user.name}</h4>
          {reveal ? (
            <div className="info-hidden">
              {user.role === "teacher" ? <h4>Teaches:</h4> : <h4>Wants to learn:</h4>}
              <ul>
                {user.instruments.map((instrument, index) => {
                  return <li key={index}>{instrument}</li>;
                })}
              </ul>
              <h4>Styles: </h4>
              <ul>
                {user.styles.map((style, index) => {
                  return <li key={index}>{style}</li>;
                })}
              </ul>
              <h4>Located in: {user.location}</h4>
              <h4>
                Classes: {user.online && "Online"} {user.online && user.in_person && "/"} {user.in_person && "In person"}
              </h4>
              {user.role === "teacher" && <h4>Price: {user.price} Euros/hour</h4>}
            </div>
          ) : (
            ""
          )}
        </div>
        <ReactPlayer playing={index === currentIndex ? playing : false} index={index} style={{ borderRadius: "40px", position: "fixed", maxWidth: "330px", minWidth: "330px" }} height="550px" url={`https://www.youtube.com/embed/${user.video}?controls=0&showinfo=0`} id="video-player" />
      </TinderCard>
    </>
  );
}

export default SwipeCard;
