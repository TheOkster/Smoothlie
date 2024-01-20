import React, { useState, useEffect } from "react";

// import "./.css";

/**
 * Component to render an online user
 *
 * Proptypes
 *  *  sets it to active
 * @param {Array[String]} fields
 */
const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <label for="dog-names">Choose a dog name:</label>
      <select name="dog-names" id="dog-names">
        {props.fields.map((field) => (
          <option value={field}>{field}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
