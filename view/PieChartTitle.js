import PropTypes from "prop-types";
import styled from "styled-components";
import CountUp from "react-countup";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

const PieChartTitle = ({ className, siteName, siteColor }) => {
  const { total } = useContext(GlobalContext);
  let price = total?.buy123?.percentage;
  if (siteName === "松果購物") {
    price = total?.pcone?.percentage;
  }

  return (
    <>
      <div className={className}>
        <img className="buy123-line" src="/Images/pie-buy123-line.png" />
        <div className="words">
          <div className="previous-word">
            <span className="tiny-words">集團</span>
            <span className="title-words">{siteName}</span>
            <span>
              <p className="category-words">分類排行</p>
              <p className="eight-words">前8名熱門排行</p>
            </span>
          </div>
        </div>

        <div className="number">
          <p className="eight-words">營收占比</p>
          <p
            className="title-words number-font"
            style={{ color: `${siteColor}` }}
          >
            <CountUp start={0} end={price} duration={180} />%
          </p>
        </div>

        <img className="under-line" src="/Images/pie-under-line.png" />
      </div>
    </>
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
  /* background-color: black; */
  /* position: relative; */
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
  }
  .eight-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .number-font {
    font-size: 32px;
    font-family: Prohibition;
    line-height: 40px;
    color: rgba(255, 107, 0, 1);
  }

  .under-line {
    display: block;
    width: 100%;
  }
`;
