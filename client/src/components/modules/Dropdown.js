import React, { useState, useEffect } from "react";

// import "./.css";

/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @property {string} _name
 *  @param {string} label
 *  @param {Array[String]} fields
 */
const Dropdown = (props) => {
  return (
    // Uses Builtin OS dropdown, can change later for better design
    <div className="Dropdown-dropdown">
      <label for={props._id}>{props.label}</label>
      <select name={props._name} id={props._id}>
        {props.fields.map((field) => (
          <option value={field}>{field}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
