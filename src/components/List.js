import React from "react";
import PropTypes from "prop-types";

export const List = ({ children }) => {
  return <ul className="w3-ul">{children}</ul>;
};

export const Li = ({ children }) => {
  return <li>{children}</li>;
};

Li.propTypes = {
  children: PropTypes.node.isRequired,
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};
