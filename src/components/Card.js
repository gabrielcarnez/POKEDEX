import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const CardLink = (props) => {
  const { link, text, img, action = false } = props;

  const errorImg = "/img/no-image.png";

  function onError(e) {
    e.target.src = errorImg;
  }

  return (
    <div className="w3-third w3-container w3-margin-bottom">
      <Link to={link}>
        <img
          src={img || errorImg}
          onError={(e) => onError(e)}
          alt={`${text}`}
          style={{ width: "100%" }}
          className="w3-hover-opacity"
        />
      </Link>
      <div className="w3-container w3-white">
        <p className="text-hide">
          <b>{text}</b>
          {action && action}
        </p>
      </div>
    </div>
  );
};

CardLink.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  img: PropTypes.string,
  action: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
};

export const Card = ({ children, headerText, headerColor = "light-grey" }) => {
  return (
    <div className="w3-card-4">
      {headerText && (
        <header className={`w3-container w3-${headerColor}`}>
          <h3>
            <span>{headerText}</span>
          </h3>
        </header>
      )}
      {children}
    </div>
  );
};

Card.propTypes = {
  headerText: PropTypes.string,
  headerColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};
