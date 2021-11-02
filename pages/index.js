import styled from "styled-components";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

import Background from "../view/background";

const Map = dynamic(() => import("../view/map"));
const Time = dynamic(() => import("../view/Time"));
const PieChart = dynamic(() => import("../view/PieChart"));
const SiteNumber = dynamic(() => import("../view/SiteNumber"));
function HomePage({ className }) {
  const data = {
    total_rev: 3376762.4661478,
    stie_rev: {
      buy123: 3254734.1907595,
      pcone: 122028.27538828
    }
  };

  let buy123Number = Math.round((data.stie_rev.buy123 / data.total_rev) * 100);
  let pconeNumber = Math.round((data.stie_rev.pcone / data.total_rev) * 100);

  return (
    <div className={className}>
      <div className="dead-line">
        <Time />
        <PieChart
          siteName="生活市集"
          siteColor="rgba(255, 107, 0, 1)"
          number={buy123Number}
        />
        <PieChart
          siteName="松果購物"
          siteColor="rgba(247, 66, 47, 1)"
          number={pconeNumber}
        />
        <SiteNumber />
      </div>
      <Map />
      <Background />
    </div>
  );
}

export default styled(HomePage)`
  color: white;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
