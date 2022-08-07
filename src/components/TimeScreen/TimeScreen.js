import "./TimeScreen.css";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";

function TimeScreen() {
  function timeSlotValidator(slotTime) {
    const bookedTime = new Date("2022-08-03T-12:45");
    console.log(bookedTime);
    const isValid = slotTime.getTime() !== bookedTime.getTime();
    return isValid;
  }

  return (
    <div className="container h-screen w-screen flex justify-center items-center mt-5 pt-5">
      <div className="mt-5 justify-self-center self-center">
        <DayTimePicker timeSlotSizeMinutes={15} timeSlotValidator={timeSlotValidator} />;
      </div>
    </div>
  );
}

export default TimeScreen;
