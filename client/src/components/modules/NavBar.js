import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

// const NavBar = () => {
//   return (
//     <nav className="NavBar-container">
//       <div className="NavBar-title">Home</div>
//     </nav>
//   );
// };

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/NewSmoothie" className="NavBar-link">
          New Smoothie
        </Link>
        <Link to="/PastSmoothies" className="NavBar-link">
          Past Smoothies
        </Link>
        <Link to="/TaskPage" className="NavBar-link">
          Task Page (testing prototype)
        </Link>
        {/* get rid of this later */}
      </div>
    </nav>
  );
};

export default NavBar;
