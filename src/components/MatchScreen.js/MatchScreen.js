import "./MatchScreen.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function MatchScreen() {
  const data = useContext(UserContext);
  const teacherName = data[0].selectedTeacher;
  const userName = data[0].loggedUser.name;

  const navigate = useNavigate();

  if (!teacherName) {
    return "Loading...";
  }

  return (
    <div className="match-main" onClick={() => navigate(-1)}>
      <h1 className="match-names">
        You, {userName}, have matched with: {teacherName}!
      </h1>
      <h2>Click to go back</h2>
    </div>
  );
}

export default MatchScreen;
