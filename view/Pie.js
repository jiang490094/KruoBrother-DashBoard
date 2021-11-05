import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import styled from "styled-components";

const Pie = (props, { className }) => {
  const ref = useRef(null);
  const createPie = d3
    .pie()
    .value((d) => d.amount)
    .sort(null);
  const createArc = d3
    .arc()
    .innerRadius(props.innerRadius)
    .outerRadius(props.outerRadius);
  //   const colors = d3.scaleOrdinal(d3.schemeCategory10);
  //   const format = d3.format(".2f");

  useEffect(() => {
    const data = createPie(props.data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc");

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => props.colors[i]);

    // const text = groupWithUpdate
    //   .append("text")
    //   .merge(groupWithData.select("text"));

    // text
    //   .attr("text-anchor", "middle")
    //   .attr("alignment-baseline", "middle")
    //   .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
    //   .style("fill", "white")
    //   .style("font-size", 10)
    //   .text((d) => format(d.value));
  }, [props.data]);

  return (
    <svg width="600" height="600" className={className}>
      <g
        ref={ref}
        strokeWidth="0.5"
        filter="url(#glow)"
        id="pie"
        stroke="white"
        strokeOpacity="0.5"
        transform="translate(100,100)"
      />
      <defs>
        <linearGradient id="MyGradient">
          <stop offset="0%" stopColor="#6af9ff" />
          <stop offset="95%" stopColor="#c9c3ff" />
        </linearGradient>
      </defs>
      <defs>
        <filter id="glow">
          <fegaussianblur
            className="blur"
            result="coloredBlur"
            stddeviation="4"
          />
          <femerge>
            <femergenode in="coloredBlur"></femergenode>
            <femergenode in="coloredBlur"></femergenode>
            <femergenode in="SourceGraphic"></femergenode>
          </femerge>
        </filter>
      </defs>
    </svg>
  );
};

Pie.propTypes = {
  innerRadius: PropTypes.string.isRequired,
  outerRadius: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
};

export default styled(Pie)``;
