import "./PaymentForm.css";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import serverUrl from "../../serverUrl";
import { useNavigate } from "react-router-dom";

const axios = require("axios");

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const data = useContext(UserContext);
  const dispatch = data[1];
  const studentData = data[0].loggedUser;
  const teacherData = data[0].matchedUser;
  const bookedTime = data[0].bookingTime;
  const date = `${data[0].bookingTime.toISOString().split("T")[0]}`;
  console.log(date);

  function processNewBooking(bookingData) {
    axios
      .post(`${serverUrl}/bookings`, bookingData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  function updateTeacherAvailability() {
    const newValue = [...teacherData.availability, bookedTime];
    axios
      .patch(`${serverUrl}/users/${teacherData._id}`, {
        key: "availability",
        value: newValue,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  function generateBooking() {
    const bookingData = {
      teacher_id: teacherData._id,
      teacher_name: teacherData.name,
      teacher_email: teacherData.email,
      teacher_phone: teacherData.phone,
      student_id: studentData._id,
      student_name: studentData.name,
      student_email: studentData.email,
      student_phone: studentData.phone,
      payed: true,
      date: bookedTime,
      time: bookedTime,
      online: true,
      status: "Confirmed",
    };
    processNewBooking(bookingData);
    updateTeacherAvailability(bookedTime);
    dispatch({ type: "SET_BOOKED_TIME", payload: bookedTime });
    dispatch({ type: "SET_NEW_BOOKING", payload: bookingData });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`${serverUrl}/payment`, {
          amount: teacherData.price * 100,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          generateBooking();
          setTimeout(() => {
            navigate("/bookings");
          }, 3000);
        }
      } catch (error) {
        console.log("Error", error);
        setFailure(true);
        setErrorMessage(error.message);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="border-2 border-black rounded-lg p-2 py-4 shadow-lg bg-gray-50 mt-10 max-w-90">
      {studentData && teacherData && (
        <div className="container">
          <h1 className="text-4xl mb-10 font-bold">Order Summary:</h1>
          <h2 className="text-xl mb-5 font-bold">Card owner: {studentData.name}</h2>
          <h2 className="text-xl mb-5 font-bold">Payable to: {teacherData.name}</h2>
          <h2 className="text-xl mb-5 font-bold">Book: 1 class on {date}</h2>
          <h2 className="text-xl mb-6 font-bold">Amount: €{teacherData.price.toFixed(2)}</h2>
          <h1 className="text-4xl mb-2 mt-2 font-bold">Pay with card:</h1>
        </div>
      )}
      {!success && !failure ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="stripe">Pay Now!</button>
        </form>
      ) : success ? (
        <div>
          <h2 className="text-2xl">Booking successful! You'll soon receive a confirmation e-mail.</h2>
        </div>
      ) : (
        errorMessage && (
          <div>
            <h2>Paiment failed! {errorMessage}.</h2>
          </div>
        )
      )}
    </div>
  );
}
