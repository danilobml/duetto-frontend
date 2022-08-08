import "./BookingCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

function BookingCard({ booking }) {
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;
  const date = booking.date.split("T")[0];
  const time = booking.date.substring(booking.date.indexOf("T") + 1).split(".")[0];
  return (
    <div className="container w-screen flex justify-center ">
      {booking && loggedUser && (
        <Link to={`/booking/${booking._id}`} className="bcard flex flex-col text-left p-6 mr-5 ml-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {loggedUser.role === "student" ? <h5 className="mb-2 text-lg font-bold tracking-tight max-w-sm text-gray-900 dark:text-white">{booking.teacher_name}</h5> : <h5 className="mb-2 text-lg font-bold tracking-tight max-w-sm text-gray-900 dark:text-white">{booking.student_name}</h5>}
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Class on: {date} at {time}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">Status: {booking.status}.</p>
        </Link>
      )}
    </div>
  );
}

export default BookingCard;
