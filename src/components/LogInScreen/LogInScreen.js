import "./LogInScreen.css";
import { useNavigate } from "react-router-dom";
import icon from "../../images/logo.png";

function LogInScreen() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center w-screen h-6 items-center mt-5 pt-10 pb-0">
        <img src={icon} alt="icon duetto" className="icon" />
      </div>
      <div className="container w-screen h-screen my-auto">
        <div className="h-screen flex justify-center items-center">
          <form className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" method="POST" action="" style={{ width: "97%", maxWidth: "500px" }}>
            <h1 className="text-center text-3xl">Login</h1>
            <h2 className="text-center text-xl">If you already have an account:</h2>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" for="email">
                Email
              </label>
              <input style={{ width: "100%" }} className="w-96 px-3 py-2 rounded-md border border-slate-400" type="email" placeholder="Your Email" name="email" id="email" />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-light" for="password">
                Password
              </label>
              <input style={{ width: "100%" }} className="w-96 px-3 py-2 rounded-md border border-slate-400" type="password" placeholder="Your Password" name="password" id="password" />
            </div>
            <button className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
              Log In
            </button>
            <h2 className="text-center text-xl">Or register a new account:</h2>
            <button onClick={() => navigate("/register")} className="w-full px-10 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogInScreen;
