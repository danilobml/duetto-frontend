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
          <span
            onClick={() => {
              dispatch("SET_MATCHED_USER", matchedUser);
              navigate("/time");
            }}
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Book now!
          </span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Chat</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Bookings</span>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
