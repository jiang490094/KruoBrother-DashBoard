import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import * as d3 from "d3";

const TopProduct = ({ className }) => {
  const ex = useRef();

  useEffect(() => {
    fetch("https://data.cityofnewyork.us/resource/tg4x-b46p.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const permits = data.filter((event) => {
          return event.eventtype === "Shooting Permit";
        });

        console.log(permits);
      });
  });
  return (
    <div id="just-ex" className={className}>
      topProduct,it is belonging leona!!
      <svg ref={ex}></svg>
    </div>
  );
};

TopProduct.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(TopProduct)`
  color: pink;
`;
