import "./PaymentForm.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = "pk_test_51LTrOSKcKI87kMaGevHxd32tASpnPEFbsJin7jeLbPklxr1G0cBew4PujN8DPP6SQthmrK8uFINirfYiLaEvmeH200QaPZc06p";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}

export default StripeContainer;
