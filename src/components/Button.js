import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, color = "dark-grey", styles = {} }) => {
  return (
    <button
      onClick={() => onClick()}
      className={`w3-button w3-block w3-${color}`}
      style={styles}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default Button;
