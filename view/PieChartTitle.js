import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

const PieChartTitle = ({ className, siteName, siteColor }) => {
  const { rankDisplay } = useContext(GlobalContext);
  let topArray = [];
  let site = "buy123";
  let s = 5;
  if (siteName === "松果購物") {
    site = "pcone";
  }
  for (let i = 0; i < rankDisplay.length; i++) {
    if (rankDisplay[i].site == site) {
      topArray.push(rankDisplay[i].item_name);
    }
  }

  if (topArray[0] && topArray[0].length > 20) {
    s = 8;
  }

  return (
    <div className={className}>
      <img className="buy123-line" src="/Images/pie-buy123-line.png" />
      <div className="words">
        <div className="previous-word">
          <span className="tiny-words">集團</span>
          <span className="title-words">{siteName}</span>
          {/* <span>
              <p className="category-words">分類排行</p>
              <p className="eight-words">前8名熱門排行</p>
            </span> */}
        </div>
      </div>

      <div className="number">
        <div className="eight-words">top product</div>
        <div
          className="title-words number-font"
          style={{ color: `${siteColor}` }}
        >
          <div className="marquee">
            <p style={{ animation: `scroll-left ${s}s linear infinite` }}>
              {topArray[0]}
            </p>
          </div>
        </div>
      </div>

      <img className="under-line" src="/Images/pie-under-line.png" />
    </div>
  );
};

PieChartTitle.propTypes = {
  className: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  siteColor: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default styled(PieChartTitle)`
  width: 500px;
  margin-bottom: 20px;

  .buy123-line {
    width: 223.79px;
  }
  .words {
    display: flex;
    align-items: center;
    margin: 0 12px;
    justify-content: space-between;
  }
  .previous-word {
    display: flex;
    align-items: center;
  }

  .tiny-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-right: 15px;
  }

  .title-words {
    font-size: 28px;
    font-weight: 600;
    color: white;
    margin-right: 15px;
  }

  .category-words {
    font-size: 16px;
    font-weight: 600;
    color: white;
  }

  .number {
    position: absolute;
    top: 10px;
    right: 0;
    max-width: 200px;
  }
  .eight-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .number-font {
    font-size: 20px;
    font-family: Prohibition;
    line-height: 40px;
    color: rgba(255, 107, 0, 1);
  }

  .under-line {
    display: block;
    width: 100%;
  }

  .marquee {
    width: 200px;
    height: 50px;
    overflow: hidden;
    position: relative;
  }

  .marquee p {
    white-space: nowrap;
    position: absolute;
    height: 100%;
    margin: 0;
    line-height: 50px;
    text-align: center;
    transform: translateX(100%);
  }

  @keyframes scroll-left {
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }
`;
