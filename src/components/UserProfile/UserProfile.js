import "./UserProfile.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function UserProfile() {
  const data = useContext(UserContext);
  const user = data[0].loggedUser;

  const navigate = useNavigate();

  if (!user) {
    return "Loading...";
  }

  return (
    <>
      <div className="user-data mt-4">
        <img src={user.profile_picture} alt="user" className="user-pic" />
        <h4>Name: {user.name}</h4>
        <h4>Registered as: {user.role === "student" ? "Student" : "Teacher"}</h4>
        <h4>Age: {user.age}</h4>
        <h4>Phone: {user.phone}</h4>
        <h4>Location: {user.location}</h4>
        <h4>Instruments:</h4>
        <ul>
          {user.instruments.map((instrument, index) => {
            return <li key={index}>{instrument}</li>;
          })}
        </ul>
        <h4>Preferred styles:</h4>
        <ul>
          {user.styles.map((style, index) => {
            return <li key={index}>{style}</li>;
          })}
        </ul>
        <h4>
          Preferred classes: {user.online && "Online"} {user.online && user.in_person && "/"} {user.in_person && "In person"}
        </h4>
        {user.role === "student" ? (
          <h4>
            Desired price range: from {user.min_price}Euros /hour to {user.max_price}Euros /hour
          </h4>
        ) : (
          <h4>Price per hour: {user.price}</h4>
        )}
      </div>
    </>
  );
}

export default UserProfile;
