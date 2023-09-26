import React from "react";
import PropTypes from "prop-types";

const Info = ({ color = "pale-blue", title = "", children }) => {
  return (
    <div class={`w3-panel w3-${color} w3-border`}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

Info.propTypes = {};

export default Info;
