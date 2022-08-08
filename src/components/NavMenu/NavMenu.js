import "./NavMenu.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function NavMenu() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="nav-menu flex items-center py-8">
      <nav>
        <section className="MOBILE-MENU flex">
          <div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            {" "}
            <div className="CROSS-ICON absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}>
              <svg className="h-8 w-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul onClick={() => setIsNavOpen((prev) => !prev)} className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/">Match!</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/update">Update Profile</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/settings">Change Settings</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/matches">My Matches</Link>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <Link to="/bookings">Bookings</Link>
              </li>
            </ul>
          </div>
        </section>
      </nav>
    </div>
  );
}

export default NavMenu;
