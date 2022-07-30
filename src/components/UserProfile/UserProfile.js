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
      <div className="CROSS-ICON absolute top-0 right-0 px-8 py-8" onClick={() => navigate(-1)}>
        <svg className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>
      <div className="user-data">
        <img src={user.profile_picture} alt="user" className="user-pic" />
        <h4>Name: {user.name}</h4>
        <h4>Registered as: {user.student ? "Student" : "Teacher"}</h4>
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
        {user.student ? (
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
