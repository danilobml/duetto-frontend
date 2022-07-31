import "./LogInScreen.css";

function LogInScreen() {
  return (
    <div className="container">
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-700 to-amber-700">
        <form className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" method="POST" action="" style={{ width: "97%", maxWidth: "500px" }}>
          <h1 className="text-center text-3xl">Duetto Login</h1>
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
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogInScreen;
