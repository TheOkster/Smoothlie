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
      <div className="NavBar-title u-inlineBlock"> Smoothlie </div>
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
      </div>
    </nav>
  );
};

export default NavBar;
