import React from "react";
import PropTypes from "prop-types";

const Contact = ({ list = [] }) => {
  return (
    <div className="w3-panel w3-large">
      {list.map((l, index) => (
        <a
          key={`contact-${index}`}
          rel="noreferrer"
          target="_blank"
          href={l.link}
        >
          <i className={`w3-margin fa fa-${l.icon} w3-hover-opacity`}></i>
        </a>
      ))}
    </div>
  );
};

Contact.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Contact;
