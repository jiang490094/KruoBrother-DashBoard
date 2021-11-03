import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";
import { useEffect, useContext } from "react";
import CountUp from "react-countup";

import { GlobalContext } from "../provider/globalprovider";

const PieChartCategory = ({ className, siteName }) => {
  const { categories } = useContext(GlobalContext);
  const data = [
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具",
    "照明燈具"
  ];

  // let pieDatas = [categories];

  // const chartColor = {
  //   first: {
  //     color: "rgba(24, 254, 254, 0.8)"
  //   },
  //   second: {
  //     color: "rgba(255, 153, 0, 0.8)"
  //   },
  //   third: {
  //     color: "rgba(151, 0, 175, 0.8)"
  //   },
  //   fourth: {
  //     color: "rgba(255, 92, 22, 0.8)"
  //   },
  //   fifth: {
  //     color: "rgba(255, 0, 214, 0.8)"
  //   },
  //   sixth: {
  //     color: "rgba(255, 61, 0, 0.8)"
  //   },
  //   seventh: {
  //     color: "rgba(82, 0, 255, 0.8)"
  //   },
  //   eighth: {
  //     color: "rgba(6, 132, 248, 0.8)"
  //   },
  //   ninth: {
  //     color: "rgba(149, 132, 255, 0.8)"
  //   },
  //   tenth: {
  //     color: "rgba(5, 0, 232, 0.8)"
  //   }
  // };

  // const color1 = [
  //   "rgba(82, 0, 255, 1)",
  //   "rgba(24, 254, 254, 1)",
  //   "rgba(151, 0, 175, 1)",
  //   "rgba(255, 0, 214, 1)",
  //   "rgba(255, 0, 214, 1)"
  // ];
  // const color2 = [
  //   "rgba(255, 153, 0, 1)",
  //   "rgba(255, 92, 22, 1)",
  //   "rgba(255, 61, 0, 1)",
  //   "rgba(6, 132, 248, 1)",
  //   "rgba(5, 0, 232, 1)"
  // ];

  const color = [
    "rgba(24, 254, 254, 1)",
    "rgba(255, 153, 0, 1)",
    "rgba(151, 0, 175, 1)",
    "rgba(255, 92, 22, 1)",
    "rgba(255, 0, 214, 1)",
    "rgba(255, 61, 0, 1)",
    "rgba(82, 0, 255, 1)",
    "rgba(6, 132, 248, 1)",
    "rgba(149, 132, 255, 1)",
    "rgba(5, 0, 232, 1)"
  ];

  function pie_chart(root) {
    console.log("categories", categories);

    const width = document.querySelector(`#${root}`).clientWidth,
      height = width;
    const total = categories
      .map((data) => data.amount)
      .reduce((current, acc) => current + acc);
    // const total = pieDatas[0].series
    //   .map((data) => data.value)
    //   .reduce((current, acc) => current + acc);

    const newData = categories.map((data) => ({
      name: data.category_name,
      amount: data.amount.map((el) => ({
        value: el.amount === 0 ? 0 : ((el.amount / total) * 100).toFixed(1)
      }))
    }));
    // const newData = pieDatas.map((data) => ({
    //   name: data.name,
    //   series: data.series.map((el) => ({
    //     name: el.name,
    //     value: el.value === 0 ? 0 : ((el.value / total) * 100).toFixed(1)
    //   }))
    // }));

    const svg = d3
      .select(document.querySelector(`#${root}`))
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(width / 2);
    const pie = d3.pie().value((d) => d.value);
    svg
      .selectAll("path")
      .data(pie(newData[0].series))
      .enter()
      .append("g")
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color[i]);
  }

  useEffect(() => {
    if (siteName == "生活市集") pie_chart("pie");
    if (siteName == "松果購物") pie_chart("piePcone");
  }, []);

  return (
    <div className={className}>
      <div>
        {data.map((i, index) => {
          if (index % 2 == 0) {
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${color[index]}` }}
                >
                  <CountUp start={0} end={20} duration={2} />%
                </div>
                <div className="category-name">{i + (index + 1)}</div>
              </div>
            );
          }
        })}
      </div>
      <div id={siteName == "生活市集" ? "pie" : "piePcone"}></div>
      <div>
        {data.map((i, index) => {
          if (index % 2 != 0) {
            return (
              <div className="category-list" key={index}>
                <div
                  className="category-number"
                  style={{ borderLeft: `4px solid ${color[index]}` }}
                >
                  <CountUp start={0} end={20} duration={2} />%
                </div>
                <div className="category-name">{i + (index + 1)}</div>
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
      /* width: 100px; */
      height: 36px;
      padding-left: 9px;
      color: white;
      font-size: 14px;
      line-height: 36px;
    }
  }

  #pie {
    width: 175px;
  }

  #piePcone {
    width: 175px;
  }
`;
