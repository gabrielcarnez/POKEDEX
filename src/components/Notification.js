import { React, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Notification = ({
  children,
  color = "gray",
  extrClass = "",
  timer = 3000,
  callback = () => {},
}) => {
  const notification = useRef(null);

  useEffect(() => {
    if (notification.current) {
      notification.current.classList.add("show");
      setTimeout(function () {
        if (
          notification.current &&
          notification.current.classList.contains("show")
        ) {
          notification.current.className =
            notification.current.className.replace("show", "");
          callback();
        }
      }, timer);
    }
  });

  return (
    <div ref={notification} className={`${extrClass} notification w3-${color}`}>
      {children}
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
