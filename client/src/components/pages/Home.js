import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Home.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "1020384084742-p0hsqhvuie7dsgllkiipniep15n9godf.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
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
          <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        )}
      </GoogleOAuthProvider>
      heyy wassup
    </>
  );
};

export default Home;
