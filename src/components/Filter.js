import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Filter = ({
  filterText,
  filters,
  onClick = () => {},
  colorSelected = "red",
  colorNoSelected = "white",
  itemSelected,
}) => {
  return (
    <div className="w3-section w3-bottombar w3-padding-large">
      <span className="w3-margin-right">{filterText}</span>
      {filters.map((g, index) => (
        <Link
          key={`filter-${index}`}
          to={`/${g}`}
          className={`w3-button w3-${
            g.toString() === itemSelected.toString()
              ? colorSelected
              : colorNoSelected
          }`}
          onClick={() => onClick()}
        >
          {g}
        </Link>
      ))}
    </div>
  );
};

Filter.propTypes = {
  filterText: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClick: PropTypes.func,
  colorSelected: PropTypes.string,
  colorNoSelected: PropTypes.string,
  itemSelected: PropTypes.any,
};

export default Filter;
