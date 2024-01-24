import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";

//DONE: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "1020384084742-p0hsqhvuie7dsgllkiipniep15n9godf.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <div className="Home-container">
        <div className="Home-logo">Smoothlie</div>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          {userId ? (
            <button
              onClick={() => {
                googleLogout();
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <div className="Home-centerButton">
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            </div>
          )}
        </GoogleOAuthProvider>
      </div>
    </>
  );
};

export default Home;
