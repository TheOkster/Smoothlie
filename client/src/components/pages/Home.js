import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";
import {Link} from "react-router-dom";

import "../../utilities.css";
import "./Home.css";
import "./General.css";

//DONE: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "1020384084742-p0hsqhvuie7dsgllkiipniep15n9godf.apps.googleusercontent.com";

const Home = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <div className="Background">
            {/* <img src={require("./TaskPage.jpg").default} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}} /> */}
        <div className="Home-container">
          <div className="Home-logo">
            <h1>Smooth</h1>
            <h1><div className="Home-l">l</div></h1>
            <h1>ie</h1>
            </div>
          <div className="buttonContainer">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            {userId ? (
              <>
              <Link to={{pathname: "/selecttasks"}}> {/* need to fix this later; this is going to redirect to another page depending on whether you've selected tasks before*/}
                <button className="Button">
                  Welcome! Click here to begin.
                </button>
              </Link>

              <button className ="Button"
                onClick={() => {
                  googleLogout();
                  handleLogout();
                }}
              >
                Logout
              </button>
              </>
            ) : (
              <>
              <div className="Button">
                <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
              </div>
              <div className="Label">Please login to start!</div>
              </>
            )}
          </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
