import "./Header.css";
import icon from "../../images/logo.png";
import { useContext } from "react";
import UserContext from "../UserContext";
import { Link, Navigate } from "react-router-dom";

import NavMenu from "../NavMenu/NavMenu";
import { useNavigate } from "react-router-dom";

function Header() {
  const data = useContext(UserContext);
  const userPicture = data[0].loggedUser?.profile_picture;

  const navigate = useNavigate();

  return (
    <div className="header-div bg-white opacity-1">
      <Link to="/user">
        <img src={userPicture} alt="user" className="user-image rounded-full" />
      </Link>
      <img onClick={() => navigate("/")} src={icon} alt="icon duetto" className="icon" />
      <NavMenu />
    </div>
  );
}

export default Header;
