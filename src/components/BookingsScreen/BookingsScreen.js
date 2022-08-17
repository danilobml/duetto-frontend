import { useState, useContext, useEffect } from "react";
import UserContext from "../UserContext";
import serverUrl from "../../serverUrl";

import BookingCard from "../BookingCard/BookingCard";

const axios = require("axios");

function BookingsScreen({ dispatch }) {
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/bookings/${loggedUser._id}`)
      .then((response) => {
        setUserBookings(response.data);
        dispatch({ type: "SET_USERS_BOOKINGS", payload: response.data });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {!userBookings.length ? (
        <div>
          <h1 className="font-bold text-2xl">No bookings yet.</h1>
        </div>
      ) : (
        <ul>
          {userBookings &&
            userBookings.map((booking, i) => {
              return (
                <li key={i}>
                  <BookingCard booking={booking} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default BookingsScreen;
