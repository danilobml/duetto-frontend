import "./MatchScreen.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function MatchScreen() {
  const data = useContext(UserContext);
  const teacher = data[0].selectedTeacher;
  const userName = data[0].loggedUser.name;

  const navigate = useNavigate();

  if (!teacher) {
    return "Loading...";
  }

  return (
    <div className="match-main" onClick={() => navigate(-1)}>
      <h1 className="match-names">
        You, {userName}, have matched with: {teacher.name}!
      </h1>
      <h2>Click to go back</h2>
    </div>
  );
}

export default MatchScreen;
