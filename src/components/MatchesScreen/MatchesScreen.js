import { useContext } from "react";
import UserContext from "../UserContext";

import MatchCard from "../MatchCard/MatchCard";

function MatchesScreen({ dispatch }) {
  const data = useContext(UserContext);
  const usersData = data[0].usersData;
  const userId = data[0].loggedUser._id;
  const matches = data[0].loggedUserMatches;
  console.log(data);
  const matchIds = matches.map((match) => {
    if (match.uid1 !== userId) {
      return match.uid1;
    } else {
      return match.uid2;
    }
  });
  const matchedUsers = usersData.filter((user) => matchIds.includes(user._id));

  console.log(matchedUsers);

  return (
    <>
      <h1 className="font-bold text-xl">Your Matches:</h1>
      <div className="flex overflow-auto">
        <ul>
          {matchedUsers.map((matchedUser, i) => {
            return (
              <li>
                <MatchCard matchedUser={matchedUser} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default MatchesScreen;
