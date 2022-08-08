import "./TimeScreen.css";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";

function TimeScreen({ dispatch }) {
  const data = useContext(UserContext);
  const availability = data[0].matchedUser.availability;
  const transformedAvailability = availability.map((x) => (x = new Date(x).getTime()));
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState("");

  const navigate = useNavigate();

  function timeSlotValidator(slotTime) {
    const eveningTime = new Date(slotTime.getFullYear(), slotTime.getMonth(), slotTime.getDate(), 20, 0, 0);
    const nightTime = new Date(slotTime.getFullYear(), slotTime.getMonth(), slotTime.getDate(), 7, 30, 0);

    const isValid = !transformedAvailability ? slotTime.getTime() < eveningTime.getTime() && slotTime.getTime() > nightTime.getTime() : slotTime.getTime() < eveningTime.getTime() && slotTime.getTime() > nightTime.getTime() && !transformedAvailability.includes(slotTime.getTime());
    return isValid;
  }

  function handleScheduled(dateTime) {
    dispatch({ type: "SET_BOOKING_TIME", payload: dateTime });
    navigate("/payment");
  }

  return (
    <div className="container h-70 w-screen flex flex-col justify-center items-center mt-5 pt-5">
      <div className="mt-5">
        <DayTimePicker className="mt-5 justify-self-center self-center" timeSlotSizeMinutes={30} timeSlotValidator={timeSlotValidator} onConfirm={handleScheduled} doneText="Booking successful!" isLoading={isScheduling} isDone={isScheduled} err={scheduleErr} />
      </div>
      <button
        onClick={() => {
          navigate("../");
        }}
        className="size-md px-10 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
      >
        Cancel
      </button>
    </div>
  );
}

export default TimeScreen;
