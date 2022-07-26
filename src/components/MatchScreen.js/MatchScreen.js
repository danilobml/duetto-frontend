import { useContext } from "react";
import UserContext from "../UserContext";

function MatchScreen() {
  const data = useContext(UserContext);
  const teacherName = data[0].selectedTeacher;
  return (
    <div>
      <h1>You've matched with: {teacherName}</h1>
    </div>
  );
}

export default MatchScreen;
