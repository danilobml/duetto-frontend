import "./BookingsScreen.css";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../UserContext";
import serverUrl from "../../serverUrl";

import BookingCard from "../BookingCard/BookingCard";

const axios = require("axios");

function BookingsScreen({ dispatch }) {
  const { id } = useParams();
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${serverUrl}/bookings/${loggedUser._id}`)
      .then((response) => {
        dispatch({ type: "SET_USERS_BOOKINGS", payload: response.data });
        if (loggedUser.role === "student") {
          setUserBookings(response.data.filter((booking) => booking.teacher_id === id));
        } else {
          setUserBookings(response.data.filter((booking) => booking.student_id === id));
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(userBookings);

  return (
    <div>
      {!userBookings.length ? (
        <div>
          <h1 className="font-bold text-2xl">No bookings yet with this user.</h1>
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
