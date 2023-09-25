import React, { useContext } from "react";
import PropTypes from "prop-types";
import PokedexContext from "../store/PokedexContext";

const Header = ({ title = "" }) => {
  const userContext = useContext(PokedexContext);
  const { menu } = userContext;
  const { toggleMenu } = menu;

  return (
    <header>
      <div>
        <img
          alt="icon-pokeball"
          src="/img/icon-pokeball.png"
          style={{ width: "65px" }}
          className="w3-circle w3-right w3-margin w3-hide-large w3-hover-opacity"
        />
      </div>
      <span
        className="w3-button w3-hide-large w3-xxlarge w3-hover-text-grey"
        onClick={() => toggleMenu()}
      >
        <i className="fa fa-bars"></i>
      </span>
      <div className="w3-container">
        <h1>
          <b>{title}</b>
        </h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
