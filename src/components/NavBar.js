import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Contact from "./Contact";
import PokedexContext from "../store/PokedexContext";
import PropTypes from "prop-types";
import Badges from "./Badges";

const NavBar = ({ menuOptions, contact }) => {
  const match = useLocation();
  const { pathname } = match;
  const userContext = useContext(PokedexContext);
  const { menu, favourites } = userContext;
  const { toggleMenu, showMenu } = menu;
  const { favourites: favouritesList } = favourites;

  return (
    <React.Fragment>
      <nav
        className="w3-sidebar w3-collapse w3-white w3-animate-left navbar"
        style={{
          display: showMenu ? "block" : "none",
        }}
      >
        <div className="w3-container">
          <span
            onClick={() => toggleMenu()}
            className="w3-hide-large w3-right w3-jumbo w3-padding w3-hover-grey"
            title="close menu"
          >
            <i className="fa fa-remove"></i>
          </span>
          <img
            src="/img/icon-pokeball.png"
            style={{ width: "45%" }}
            alt="menu"
            className="w3-round"
          />
          <h4>
            <b>PODEDEX</b>
          </h4>
        </div>
        <div className="w3-bar-block">
          {menuOptions.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              onClick={() => toggleMenu()}
              className={`w3-bar-item w3-button w3-padding ${
                pathname === m.to && "w3-text-red"
              }`}
            >
              <i className={`fa fa-${m.icon} fa-fw w3-margin-right`}></i>
              {m.text}
              {m.showBadge && favouritesList.length && (
                <Badges
                  styles={{ marginLeft: "3px" }}
                  text={favouritesList.length.toString()}
                />
              )}
            </Link>
          ))}
        </div>
        <Contact list={contact}></Contact>
      </nav>
      <div
        className="w3-overlay w3-hide-large w3-animate-opacity"
        style={{ cursor: "pointer", display: showMenu ? "block" : "none" }}
        title="close side menu"
      ></div>
    </React.Fragment>
  );
};

NavBar.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      showBadge: PropTypes.bool,
    })
  ).isRequired,
  contact: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavBar;
