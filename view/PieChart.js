import PropTypes from "prop-types";
import styled from "styled-components";

import PieChartTitle from "./PieChartTitle";
import PieChartCategory from "./PieChartCategory";

const PieChart = ({ className, siteName, siteColor, number }) => {
  let top = "";
  if (siteName === "松果購物") top = "454px";
  return (
    <div className={className} style={{ top: `${top}` }}>
      <PieChartTitle
        siteName={siteName}
        siteColor={siteColor}
        number={number}
      />
      <PieChartCategory siteName={siteName} />
    </div>
  );
};

PieChart.defaultProps = {
  number: 0
};

PieChart.propTypes = {
  className: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteColor: PropTypes.string.isRequired,
  number: PropTypes.number
};

export default styled(PieChart)`
  position: fixed;
  right: 20px;
  width: 500px;
  margin-left: 15px;
`;
