import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

import serverUrl from "../../serverUrl";

const axios = require("axios");

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;
  const bookings = data[0].usersBookings;
  const currentBooking = bookings.find((booking) => booking._id === id);
  const date = currentBooking.date.split("T")[0];
  const time = currentBooking.date.substring(currentBooking.date.indexOf("T") + 1).split(".")[0];

  function handleStatusChange(status) {
    axios
      .patch(`${serverUrl}/bookings/${currentBooking._id}`, {
        key: "status",
        value: status,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  function handleDelete() {
    axios
      .delete(`${serverUrl}/bookings/${currentBooking._id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  return (
    <div className="border-2 border-black rounded-lg p-2 py-4 shadow-lg bg-gray-50 mt-10 max-w-90">
      {currentBooking && loggedUser && (
        <div className="container">
          <h1 className="text-4xl mb-10 font-bold">Booking:</h1>
          <h2 className="text-xl mb-5 font-bold">{loggedUser.role === "student" ? `Teacher: ${currentBooking.teacher_name}` : `Student: ${currentBooking.student_name}`} </h2>
          <h2 className="text-xl mb-5 font-bold">
            Date: {date} / Time: {time}
          </h2>
          <h2 className="text-xl mb-5 font-bold">Email: {loggedUser.role === "student" ? currentBooking.teacher_email : currentBooking.student_email}</h2>
          <h2 className="text-xl mb-5 font-bold">Phone: {loggedUser.role === "student" ? currentBooking.teacher_phone : currentBooking.student_phone}</h2>
          <h2 className="text-xl mb-5 font-bold">Payed: {currentBooking.payed ? "Yes" : "No"}</h2>
          <h2 className="text-xl mb-5 font-bold">Modality: {currentBooking.online ? "Online" : "In Person"}</h2>
          <h2 className="text-xl mb-5 font-bold">Status: {currentBooking.status}</h2>
          {currentBooking.status === "Confirmed" ? (
            <>
              <button
                onClick={() => {
                  handleStatusChange("/matches");
                  navigate(-1);
                }}
                className="size-md px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in mt-2"
                type="submit"
              >
                Cancel
              </button>{" "}
              <button
                onClick={() => {
                  handleStatusChange("Taken");
                  navigate("/matches");
                }}
                className="size-md px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in mt-2"
                type="submit"
              >
                Taken
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                handleDelete();
                navigate("/matches");
              }}
              className="size-md px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in mt-2"
              type="submit"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// teacher_id: teacherData._id,
//       teacher_name: teacherData.name,
//       teacher_email: teacherData.email,
//       teacher_phone: teacherData.phone,
//       student_id: studentData._id,
//       student_name: studentData.name,
//       student_email: studentData.email,
//       student_phone: studentData.phone,
//       payed: true,
//       date: bookedTime,
//       time: bookedTime,
//       online: true,
//       confirmed: true,

export default Booking;
