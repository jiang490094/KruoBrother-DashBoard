import React from "react";
import { useCountUp } from "react-countup";
import PropTypes from "prop-types";

const SiteCoutUp = ({ price, site }) => {
  const IdName = site === "buy123" ? "buy123CountUP" : "pconeCountUp";
  useCountUp({
    ref: IdName,
    start: 0,
    end: price,
    duration: 300,
    separator: ","
  });
  return (
    <span className="total-number">
      $ <span id={IdName} />
    </span>
  );
};

export default SiteCoutUp;
SiteCoutUp.propTypes = {
  price: PropTypes.number.isRequired,
  site: PropTypes.string.isRequired
};
