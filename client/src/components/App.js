import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Home from "./pages/Home.js";
import NewSmoothie from "./pages/NewSmoothie.js";
import PastSmoothies from "./pages/PastSmoothies.js";
import TaskPage from "./pages/TaskPage.js";
import "./pages/TaskPage.jpg";

import GridPage from "./pages/Grid.js";
import NavBar from "./modules/NavBar.js";
import SelectTasks from "./pages/SelectTasks.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import NewTask from "./pages/NewTasks.js";
import CreateTasks from "./pages/CreateTasks.js";
import Result from "./pages/Result.js";
import CreateSchedule from "./pages/CreateSchedule.js";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
          }
        />
        <Route path="/NewSmoothie" element={<NewSmoothie path="/NewSmoothie" userId={userId} />} />
        <Route
          path="/PastSmoothies"
          element={<PastSmoothies path="/PastSmoothies" userId={userId} />}
        />
        <Route path="/selecttasks" element={<SelectTasks path="/selecttasks" userId={userId} />} />
        <Route path="/taskgrid" element={<GridPage path="/taskgrid" userId={userId} />} />
        <Route path="/newtask" element={<NewTask path="/newtask" userId={userId} />} />
        <Route path="/entertasks" element={<CreateTasks path="/entertasks" userId={userId} />} />
        <Route path="/result" element={<Result path="/result" userId={userId} />} />
        <Route path="/TaskPage" element={<TaskPage path="/TaskPage" />} />
        <Route path="/createschedule" element={<CreateSchedule path="/createschedule" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
