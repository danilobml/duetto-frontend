import "./BookingsScreen.css";
import { useContext } from "react";
import UserContext from "../UserContext";

function BookingsScreen() {
  const data = useContext(UserContext);
  const loggedUser = data[0].loggedUser;

  return <div>BookingsScreen</div>;
}

export default BookingsScreen;
