import styled from "styled-components";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

import Globalprovider from "../provider/globalprovider";

const Map = dynamic(() => import("../view/map"));
const Time = dynamic(() => import("../view/Time"));
const PieChart = dynamic(() => import("../view/PieChart"));
const Background = dynamic(() => import("../view/background"));
const Celebrate = dynamic(() => import("../view/celebrate"));
function HomePage({ className }) {
  return (
    <div className={className}>
      <Globalprovider>
        <div className="dead-line">
          <Time />
          <PieChart />
        </div>
        <Map />
        <Background />
        <Celebrate />
      </Globalprovider>
    </div>
  );
}

export default styled(HomePage)`
  color: white;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
