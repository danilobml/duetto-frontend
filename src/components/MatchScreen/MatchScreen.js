import "./MatchScreen.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function MatchScreen() {
  const data = useContext(UserContext);
  const user = data[0].matchedUser;

  const navigate = useNavigate();

  if (!user) {
    return "Loading...";
  }

  return (
    <div className="match-main">
      <h1 className="match-names text-3xl">You matched with: {user.name}!</h1>
      <button
        onClick={() => {
          navigate("/time");
        }}
      >
        Check availabilities
      </button>
      <h2 onClick={() => navigate(-1)}>Click to go back</h2>
    </div>
  );
}

export default MatchScreen;
