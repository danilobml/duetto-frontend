import "./RegisterScreen.css";
import icon from "../../images/logo.png";

function RegisterScreen() {
  return (
    <>
      <div className="flex justify-center w-screen h-6 items-center mt-5 pt-10 pb-0">
        <img src={icon} alt="icon duetto" className="icon" />
      </div>
      <div className="container w-screen">
        <div className="h-screen flex justify-center items-center mb-5">
          <form className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5" method="POST" action="" style={{ width: "97%", maxWidth: "500px" }}>
            <h1 className="text-center text-3xl">Create new account</h1>
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
              Confirm and proceed
            </button>
            <h2 className="text-center text-xl">Or:</h2>
            <button type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path>
              </svg>
              Sign in with Facebook
            </button>
            <button type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterScreen;
