import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";
import { useEffect } from "react";

const PieChartCategory = ({ className }) => {
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

  const pieDatas = [
    {
      series: [
        {
          name: "first",
          value: 307
        },
        {
          name: "second",
          value: 89
        },
        {
          name: "third",
          value: 146
        },
        {
          name: "fourth",
          value: 252
        },
        {
          name: "fifth",
          value: 252
        },
        {
          name: "sixth",
          value: 252
        },
        {
          name: "eighth",
          value: 252
        },
        {
          name: "ninth",
          value: 252
        },
        {
          name: "tenth",
          value: 252
        }
      ]
    }
  ];

  const chartColor = {
    first: {
      color: "rgba(82, 0, 255, 1)"
    },
    second: {
      color: "rgba(24, 254, 254, 1)"
    },
    third: {
      color: "rgba(151, 0, 175, 1)"
    },
    fourth: {
      color: "rgba(255, 0, 214, 1)"
    },
    fifth: {
      color: "rgba(255, 0, 214, 1)"
    },
    sixth: {
      color: "rgba(255, 153, 0, 1)"
    },
    seventh: {
      color: "rgba(255, 92, 22, 1)"
    },
    eighth: {
      color: "rgba(255, 61, 0, 1)"
    },
    ninth: {
      color: "rgba(6, 132, 248, 1)"
    },
    tenth: {
      color: "rgba(5, 0, 232, 1)"
    }
  };

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

  function pie_chart(root) {
    const width = document.querySelector(`#${root}`).clientWidth,
      height = width;

    const total = pieDatas[0].series
      .map((data) => data.value)
      .reduce((current, acc) => current + acc);

    const newData = pieDatas.map((data) => ({
      name: data.name,
      series: data.series.map((el) => ({
        name: el.name,
        clicks: el.value,
        value: el.value === 0 ? 0 : ((el.value / total) * 100).toFixed(1)
      }))
    }));

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
      .attr("fill", (d) => chartColor[d.data.name].color);
  }

  useEffect(() => {
    pie_chart("pie");
  }, []);

  return (
    <>
      <div className={className}>
        <div>
          {data.map((i, key) => {
            if (key % 2 == 0) {
              return (
                <div className="category-list">
                  <div className="category-number"></div>
                  <div className="category-name">{i + (key + 1)}</div>
                </div>
              );
            }
          })}
        </div>
        <div id="pie"></div>
        <div>
          {data.map((i, key) => {
            if (key % 2 != 0) {
              return (
                <div className="category-list">
                  <div className="category-number"></div>
                  <div className="category-name">{i + (key + 1)}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

PieChartCategory.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(PieChartCategory)`
  display: flex;
  justify-content: space-between;
  .category-list {
    display: flex;
    margin-bottom: 4px;
    .category-number {
      width: 40px;
      height: 36px;
      background-color: black;
      margin-right: 4px;
      border-left: 4px solid white;
    }

    .category-name {
      width: 100px;
      height: 36px;
      background-color: black;
      padding-left: 9px;
      color: white;
      font-size: 14px;
      line-height: 36px;
    }
  }

  #pie {
    width: 175px;
  }
`;
