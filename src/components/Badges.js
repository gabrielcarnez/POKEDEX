import React from "react";
import PropTypes from "prop-types";

const Badges = ({ text, color = "red", styles = {} }) => {
  return (
    <span style={styles} className={`w3-badge w3-${color}`}>
      {text}
    </span>
  );
};

Badges.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  styles: PropTypes.object,
};

export default Badges;
