import React, { useState, useEffect } from "react";
import "./Task.css";
import "../../utilities.css";
import "../pages/General.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import trash from "../pages/icons/trash.svg";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @property {string} name
 * @param onDelete
 * @param {function} onTitleClick

 */
const Task = (props) => {
  const modifiedOnTitleClick = () => {
    return props.onTitleClick(props._id);
  };
  return (
    <>
      <></>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div htmlFor={props._id} className="ViewTasks-task">
        <p className="ViewTasks-taskTitle Label" onClick={modifiedOnTitleClick}>
          {props.name}
        </p>
        {/* Please don't keep it looking like this, just temporary */}
      </div>
    </>
  );
};

export default Task;
