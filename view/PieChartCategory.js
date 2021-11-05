import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";
import CountUp from "react-countup";

import { GlobalContext } from "../provider/globalprovider";

import Pie from "./Pie";

const PieChartCategory = ({ className, siteName }) => {
  const {
    buy123Categories,
    pconeCategories,
    buy123CategorySum,
    pconeCategorySum
  } = useContext(GlobalContext);
  let objtotal = buy123CategorySum;
  let obj = buy123Categories;
  if (siteName === "松果購物") {
    obj = pconeCategories;
    objtotal = pconeCategorySum;
  }
  // console.log("obj", obj);
  // console.log("pconeSum", pconeSum);
  // console.log("buy123Sum", buy123Sum);

  const colors = [
    "rgba(24, 254, 254, 0.7)",
    "rgba(255, 153, 0, 0.7)",
    "rgba(151, 0, 175, 0.7)",
    "rgba(255, 92, 22, 0.7)",
    "rgba(255, 0, 214, 0.7)",
    "rgba(255, 61, 0, 0.7)",
    "rgba(82, 0, 255, 0.7)",
    "rgba(6, 132, 248, 0.7)",
    "rgba(149, 132, 255, 0.7)",
    "rgba(5, 0, 232, 0.7)"
  ];

  return (
    <div className={className}>
      <div>
        {obj.map((i, index) => {
          if (index % 2 == 0) {
            let percent = (i.amount / objtotal) * 100;
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${colors[index]}` }}
                >
                  <CountUp start={0} end={percent} duration={2} />%
                </div>
                <div className="category-name">{i.category_name}</div>
              </div>
            );
          }
        })}
      </div>
      <Pie
        data={obj}
        width={200}
        height={200}
        innerRadius="0"
        outerRadius={100}
        colors={colors}
      />
      <div>
        {obj.map((i, index) => {
          if (index % 2 != 0) {
            let percent = (i.amount / objtotal) * 100;
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${colors[index]}` }}
                >
                  <CountUp start={0} end={percent} duration={2} />%
                </div>
                <div className="category-name">{i.category_name}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

PieChartCategory.propTypes = {
  className: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired
};

export default styled(PieChartCategory)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 58px;
  color: white;
  .category-list {
    display: flex;
    margin-bottom: 4px;
    .category-number {
      width: 40px;
      height: 36px;
      margin-right: 4px;
      line-height: 36px;
      text-align: center;
    }

    .category-name {
      width: 90px;
      height: 36px;
      padding-left: 9px;
      color: white;
      font-size: 14px;
      line-height: 36px;
      overflow: hidden;
    }

    svg {
      position: absolute;
    }
  }
`;
