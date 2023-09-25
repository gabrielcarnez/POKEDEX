import React from "react";
import PropTypes from "prop-types";

const HorizontalList = ({ text = "", list, joinBy = " - " }) => {
  const typesNames = list && list.map((t) => t.type.name).join(joinBy);
  return (
    <div className="w3-container">
      <p>
        {text}
        {typesNames}
      </p>
    </div>
  );
};

HorizontalList.propTypes = {
  text: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  joinBy: PropTypes.string,
};

export default HorizontalList;
