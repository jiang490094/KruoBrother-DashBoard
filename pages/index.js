import styled from "styled-components";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../view/map"));
const Time = dynamic(() => import("../view/Time"));
const PieChart = dynamic(() => import("../view/PieChart"));
function HomePage({ className }) {
  return (
    <>
      <div className={className}>
        <div className="dead-line">
          <Time />
          <PieChart />
        </div>
        <Map />
      </div>
    </>
  );
}

export default styled(HomePage)`
  background-color: gray;
  color: red;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
