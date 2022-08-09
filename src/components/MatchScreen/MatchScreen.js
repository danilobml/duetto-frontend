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
    <div className="match-main container">
      <h1 className="match-names text-4xl">You matched with: {user.name}!</h1>
      {user.role === "teacher" ? (
        <button
          className="text-lg"
          onClick={() => {
            navigate("/time");
          }}
        >
          Check availabilities
        </button>
      ) : (
        <>
          <h2 className="w-5/6">Now, please wait for the student to book a class.</h2>
          <h2> We'll let you know!</h2>
        </>
      )}
      <br />
      <h2 className="mt-4" onClick={() => navigate(-1)}>
        Click to go back
      </h2>
    </div>
  );
}

export default MatchScreen;
