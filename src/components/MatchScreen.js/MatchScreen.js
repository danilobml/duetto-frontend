import { useContext } from "react";
import UserContext from "../UserContext";

function MatchScreen() {
  const data = useContext(UserContext);
  console.log(data);
  const teacherName = data[0].selectedTeacher;
  console.log(teacherName);

  if (!teacherName) {
    return "Loading...";
  }

  return (
    <div>
      <h1>You've matched with: {teacherName}</h1>
    </div>
  );
}

export default MatchScreen;
