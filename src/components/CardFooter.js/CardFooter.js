import "./CardFooter.css";
import downIcon from "../../images/arrow-down.svg";
import upIcon from "../../images/arrow-up.svg";

function CardFooter({ setReveal, reveal, swipe, playing, setPlaying }) {
  return (
    <div className="footer-div">
      <button
        onClick={() => {
          swipe("left");
        }}
        className="p-0 w-16 h-16 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <svg width="60" height="20" viewBox="-5 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg%22%3E">
          <path d="M70.7069 54.7521L51.9509 35.9981L70.7009 17.2461C70.8856 17.0614 71.0321 16.8421 71.1321 16.6008C71.2321 16.3595 71.2835 16.1008 71.2835 15.8396C71.2835 15.5784 71.2321 15.3197 71.1321 15.0784C71.0321 14.8371 70.8856 14.6178 70.7009 14.4331L57.5659 1.29512C57.1927 0.922007 56.6866 0.712402 56.1589 0.712402C55.6312 0.712402 55.1251 0.922007 54.7519 1.29512L35.9989 20.0471L17.2489 1.29512C16.5029 0.548117 15.1819 0.548117 14.4349 1.29512L1.29688 14.4311C0.924257 14.8046 0.71499 15.3106 0.71499 15.8381C0.71499 16.3657 0.924257 16.8717 1.29688 17.2451L20.0499 35.9981L1.29388 54.7531C0.921501 55.1267 0.712402 55.6327 0.712402 56.1601C0.712402 56.6876 0.921501 57.1935 1.29388 57.5671L14.4299 70.7041C14.6145 70.8891 14.8338 71.0359 15.0753 71.136C15.3167 71.2361 15.5755 71.2877 15.8369 71.2877C16.0982 71.2877 16.3571 71.2361 16.5985 71.136C16.8399 71.0359 17.0592 70.8891 17.2439 70.7041L35.9989 51.9491L54.7549 70.7031C55.1439 71.0911 55.6509 71.2861 56.1619 71.2861C56.6729 71.2861 57.1809 71.0911 57.5699 70.7031L70.7079 57.5661C71.0809 57.1928 71.2903 56.6866 71.2901 56.1589C71.2899 55.6312 71.0801 55.1252 70.7069 54.7521V54.7521Z" fill="white" />
        </svg>
      </button>
      <div className="center">
        {!reveal ? <img className="arrow-icon" alt="arrow up icon" onClick={() => setReveal(!reveal)} src={upIcon} style={{ width: "30px", alignSelf: "center" }} /> : <img className="arrow-icon" alt="arrow down icon" onClick={() => setReveal(!reveal)} src={downIcon} style={{ width: "30px", alignSelf: "center" }} />}
        <button onClick={() => setPlaying(!playing)} className="p-0 w-16 h-13 bg-gray-600 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
          {playing ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="25" viewBox="-2 0 15 15" fill="none">
              <path d="M9.375 11.875C9.03125 11.875 8.73708 11.7527 8.4925 11.5081C8.2475 11.2631 8.125 10.9688 8.125 10.625V4.375C8.125 4.03125 8.2475 3.73708 8.4925 3.4925C8.73708 3.2475 9.03125 3.125 9.375 3.125H10.625C10.9688 3.125 11.2631 3.2475 11.5081 3.4925C11.7527 3.73708 11.875 4.03125 11.875 4.375V10.625C11.875 10.9688 11.7527 11.2631 11.5081 11.5081C11.2631 11.7527 10.9688 11.875 10.625 11.875H9.375ZM4.375 11.875C4.03125 11.875 3.73708 11.7527 3.4925 11.5081C3.2475 11.2631 3.125 10.9688 3.125 10.625V4.375C3.125 4.03125 3.2475 3.73708 3.4925 3.4925C3.73708 3.2475 4.03125 3.125 4.375 3.125H5.625C5.96875 3.125 6.26313 3.2475 6.50813 3.4925C6.75271 3.73708 6.875 4.03125 6.875 4.375V10.625C6.875 10.9688 6.75271 11.2631 6.50813 11.5081C6.26313 11.7527 5.96875 11.875 5.625 11.875H4.375Z" fill="white" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="60" height="25" preserveAspectRatio="xMidYMid meet" viewBox="-2 0 16 16">
              <path fill="white" d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          )}
        </button>
      </div>
      <button
        onClick={() => {
          swipe("right");
        }}
        className="p-0 w-16 h-16 bg-green-600 rounded-full hover:bg-green-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
      >
        <svg width="60" height="27" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg%22%3E">
          <path d="M15 0L14.998 13C14.998 14.243 13.697 16 11.25 16C10.007 16 9 15.347 9 14.125C9 12.536 10.445 11.575 12 11.575C12.432 11.575 12.754 11.634 13 11.698V4.364L6 5.637V15H5.998C5.998 16.243 4.697 18 2.25 18C1.007 18 0 17.347 0 16.125C0 14.536 1.445 13.575 3 13.575C3.432 13.575 3.754 13.634 4 13.698V2L15 0Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}

export default CardFooter;
