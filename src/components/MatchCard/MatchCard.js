import "./MatchCard.css";
import { useNavigate } from "react-router-dom";

function MatchCard({ matchedUser, dispatch }) {
  const navigate = useNavigate();
  return (
    <div class="p-10">
      <div class="match-card w-60 rounded overflow-hidden shadow-lg">
        <img class="w-full max-h-18" src={matchedUser.profile_picture} alt="User" />
        <div class="px-2 py-1">
          <div class="font-bold text-lg mb-2">{matchedUser.name}</div>
        </div>
        <div class="px-6 pt-4 pb-2">
          {matchedUser.role === "teacher" && (
            <span
              onClick={() => {
                dispatch({ type: "SET_MATCHED_USER", payload: matchedUser });
                navigate("/time");
              }}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              Book now!
            </span>
          )}
          <span
            onClick={() => {
              dispatch({ type: "SET_MATCHED_USER", payload: matchedUser });
              navigate("/chat");
            }}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Chat
          </span>
          <span
            onClick={() => {
              dispatch({ type: "SET_MATCHED_USER", payload: matchedUser });
              navigate(`/bookings/${matchedUser._id}`);
            }}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Bookings
          </span>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
