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
  const { total } = useContext(GlobalContext);
  let price = total?.buy123?.percentage;
  if (siteName === "松果購物") {
    price = total?.pcone?.percentage;
  }
  let objtotal = buy123CategorySum;
  let obj = buy123Categories;
  let colors = [
    "rgb(255,111,0,0.7)",
    "rgb(255,143,0,0.4)",
    "rgb(255,160,0,0.4)",
    "rgb(255,179,0,0.4)",
    "rgb(255,193,7,0.4)",
    "rgb(255,202,40,0.3)",
    "rgb(255,213,79,0.2)",
    "rgb(255,224,130,0.1)",
    "rgb(255,236,179,0.1)",
    "rgb(255,248,225,0.1)"
  ];
  if (siteName === "松果購物") {
    obj = pconeCategories;
    objtotal = pconeCategorySum;
    colors = [
      "rgb(237,55,0,0.6)",
      "rgb(233,84,38,0.4)",
      "rgb(231,104,66,0.4)",
      "rgb(224,116,83,0.4)",
      "rgb(226,127,97,0.4)",
      "rgb(175,112,94,0.3)",
      "rgb(135,94,82,0.2)",
      "rgb(122,94,85,0.1)",
      "rgb(112,90,83,0.1)",
      "rgb(93,82,78,0.1)"
    ];
  }
  // console.log("obj", obj);
  // console.log("pconeSum", pconeSum);
  // console.log("buy123Sum", buy123Sum);

  // const colors = [
  //   "rgba(24, 254, 254, 0.65)",
  //   "rgba(255, 153, 0, 0.65)",
  //   "rgba(151, 0, 175, 0.65)",
  //   "rgba(255, 92, 22, 0.65)",
  //   "rgba(255, 0, 214, 0.65)",
  //   "rgba(255, 61, 0, 0.65)",
  //   "rgba(82, 0, 255, 0.65)",
  //   "rgba(6, 132, 248, 0.65)",
  //   "rgba(149, 132, 255, 0.65)",
  //   "rgba(5, 0, 232, 0.65)"
  // ];

  return (
    <div className={className}>
      <div className="rank">
        {obj.map((i, index) => {
          if (index % 2 == 0) {
            let percent = Math.round((i.amount / objtotal) * 100);
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${colors[index]}` }}
                >
                  {percent}%
                </div>
                <div className="category-name">{i.category}</div>
              </div>
            );
          }
        })}
      </div>
      <div className="pie">
        <Pie
          data={obj}
          width={200}
          height={200}
          innerRadius="70"
          outerRadius={90}
          colors={colors}
        />
        <div className="number">
          <p className="eight-words">營收占比</p>
          <p className="title-words number-font">
            <CountUp start={0} end={price} duration={30} />%
          </p>
        </div>
      </div>

      <div className="rank">
        {obj.map((i, index) => {
          if (index % 2 != 0) {
            let percent = Math.round((i.amount / objtotal) * 100);
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${colors[index]}` }}
                >
                  {percent}%
                </div>
                <div className="category-name">{i.category}</div>
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
  .rank {
    min-width: 150px;
  }
  .category-list {
    display: flex;
    margin-bottom: 4px;
    .category-number {
      width: 40px;
      height: 36px;
      margin-right: 4px;
      line-height: 36px;
      text-align: center;
      border-bottom: 1px dotted white;
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
  }
  .pie {
    width: 200px;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      position: absolute;
      left: 0;
      top: 0;
    }
    .number {
      text-align: center;
      font-size: 20px;
      font-family: Prohibition;
    }
    .number-font {
      margin-top: 10px;
      font-size: 32px;
      color: ${(props) => props.siteColor};
    }
  }
`;
