import React, { useState, useEffect } from "react";
import "./Task.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @property {string} name
 * @param onDelete
 */
const Task = (props) => {
  return (
    <>
      <></>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <div for={props._id} class="ViewTasks-task">
        {props.name}
        {/* Please don't keep it looking like this, just temporary */}
        <input
          type="image"
          src={require("../pages/icons/trash.svg").default}
          onClick={props.onDelete}
          class="ViewTasks-delete"
        />
      </div>
    </>
  );
};

export default Task;
