import PropTypes from "prop-types";
import styled from "styled-components";

import PieChartTitle from "./PieChartTitle";
import PieChartCategory from "./PieChartCategory";

const PieChart = ({ className, siteName, siteColor, number }) => {
  return (
    <div className={className}>
      <PieChartTitle
        siteName={siteName}
        siteColor={siteColor}
        number={number}
      />
      <PieChartCategory />
    </div>
  );
};

PieChart.propTypes = {
  className: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteColor: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default styled(PieChart)`
  position: fixed;
  right: 0;
  width: 500px;
  margin-left: 15px;
`;
