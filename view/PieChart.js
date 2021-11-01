import PropTypes from "prop-types";
import styled from "styled-components";

import PieChartTitle from "./PieChartTitle";
import PieChartCategory from "./PieChartCategory";

const PieChart = ({ className }) => {
  const data = {
    total_rev: 3376762.4661478,
    stie_rev: {
      buy123: 3254734.1907595,
      pcone: 122028.27538828
    }
  };

  let number = Math.round((data.stie_rev.buy123 / data.total_rev) * 100);

  return (
    <div className={className}>
      <PieChartTitle number={number} />
      <PieChartCategory />
    </div>
  );
};

PieChart.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(PieChart)`
  width: 500px;
  margin-left: 15px;
`;
