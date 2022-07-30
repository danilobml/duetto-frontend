import "./Header.css";
import icon from "../../images/logo.png";
import { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

import NavMenu from "../NavMenu/NavMenu";

function Header() {
  const data = useContext(UserContext);
  const userPicture = data[0].loggedUser.profile_picture;

  return (
    <div className="header-div">
      <Link to="/user">
        <img src={userPicture} alt="user" className="user-image" />
      </Link>
      <img src={icon} alt="icon duetto" className="icon" />
      <NavMenu />
    </div>
  );
}

export default Header;
