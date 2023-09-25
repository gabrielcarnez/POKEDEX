import React, { useState, useRef, Fragment } from "react";
import PropTypes from "prop-types";

const Collapse = ({ title, children, contentWithScroll }) => {
  const [open, setOpen] = useState(false);
  const body = useRef(null);
  let scrollContentValue = { height: "220px", overflowY: "scroll" };

  const isContentScroll =
    typeof contentWithScroll === "object" || contentWithScroll;

  if (typeof contentWithScroll === "object") {
    scrollContentValue = contentWithScroll;
  }

  return (
    <Fragment>
      <button
        onClick={() => setOpen(!open)}
        className="w3-btn w3-block w3-black"
      >
        {title}
      </button>

      <div
        ref={body}
        style={isContentScroll && scrollContentValue}
        className={`w3-container ${open ? "" : "w3-hide"}`}
      >
        {children}
      </div>
    </Fragment>
  );
};

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  contentWithScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

export default Collapse;
