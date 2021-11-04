import React from "react";
import CountUp from "react-countup";
import PropTypes from "prop-types";

const SiteCoutUp = ({ price, site }) => {
  const IdName = site === "buy123" ? "buy123CountUP" : "pconeCountUp";

  return (
    <span className="total-number" id={IdName}>
      $ <CountUp start={0} duration={300} separator="," end={price} />
    </span>
  );
};

export default SiteCoutUp;
SiteCoutUp.propTypes = {
  price: PropTypes.number.isRequired,
  site: PropTypes.string.isRequired
};
