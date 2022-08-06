import "./PaymentForm.css";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import serverUrl from "../../serverUrl";

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

  const data = useContext(UserContext);
  const studentData = data[0].loggedUser;
  const teacherData = data[0].matchedUser;

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
    <div className="border-2 border-black rounded-lg p-2 py-4 shadow-lg bg-gray-50">
      <div className="container my-5">
        <h1 className="text-4xl mb-10 font-bold">Payment with Card:</h1>
        <h2 className="text-xl mb-5 font-bold">Card owner: {studentData.name}</h2>
        <h2 className="text-xl mb-5 font-bold">Payable to: {teacherData.name}</h2>
        <h2 className="text-xl mb-10 font-bold">Amount: €{teacherData.price.toFixed(2)}</h2>
      </div>
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
