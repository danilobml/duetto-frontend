import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";

import MatchCard from "../MatchCard/MatchCard";
import serverUrl from "../../serverUrl";

const axios = require("axios");

function MatchesScreen({ dispatch }) {
  const data = useContext(UserContext);
  const usersData = data[0].usersData;
  const userId = data[0].loggedUser._id;
  const [matches, setMatches] = useState();
  let matchIds = [];

  useEffect(() => {
    if (userId) {
      getLoggedUserMatches();
    }
  }, [userId]);

  function getLoggedUserMatches() {
    axios
      .get(`${serverUrl}/results/${userId}`)
      .then((response) => {
        dispatch({ type: "SET_USER_MATCHES", payload: response.data });
        setMatches(response.data);
      })
      .catch((error) => console.log(error));
  }

  console.log({ matches });

  if (matches) {
    matchIds = matches.map((match) => {
      if (match.uid1 !== userId) {
        return match.uid1;
      } else {
        return match.uid2;
      }
    });
  }

  console.log({ matchIds });

  console.log({ usersData });

  return (
    <>
      {!matchIds ? (
        <div>
          <h1 className="font-bold text-2xl">No matches yet.</h1>
          <h1 className="font-bold text-2xl"> Keep on swiping!</h1>
        </div>
      ) : (
        <h1 className="font-bold text-xl">Your Matches:</h1>
      )}
      <div className="flex overflow-auto">
        <ul>
          {usersData
            .filter((user) => matchIds.includes(user._id))
            .map((matchedUser, i) => {
              return (
                <li key={i}>
                  <MatchCard matchedUser={matchedUser} dispatch={dispatch} />
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default MatchesScreen;
