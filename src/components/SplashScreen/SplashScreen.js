import "./SplashScreen.css";
import icon from "../../images/icon_big.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div className="icon-div">
      <img className="big-icon" src={icon} />
    </div>
  );
}

export default SplashScreen;
