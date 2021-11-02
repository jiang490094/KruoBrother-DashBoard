import PropTypes from "prop-types";
import styled from "styled-components";
import CountUp from "react-countup";

const SiteNumber = ({ className }) => {
  return (
    <div className={className}>
      <img src="Images/dot-line.png" />
      <div className="site-number">
        <div className="buy123">
          <div className="site-line">
            <p>分站</p>生活市集
          </div>
          <span className="total-number">
            $<CountUp start={0} end={2000} duration={9} />
          </span>
        </div>
        <img className="under-line" src="/Images/pie-under-line.png" />
        <div className="buy123 pcone">
          <div className="site-line">
            <p>分站</p>松果購物
          </div>
          <span className="total-number">
            $
            <CountUp start={0} end={1234} duration={9} />
          </span>
        </div>
      </div>
      <img src="Images/dot-line.png" />
    </div>
  );
};

SiteNumber.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(SiteNumber)`
  width: 500px;
  position: fixed;
  right: 0;
  bottom: 0;
  img {
    display: block;
  }
  .site-number {
    background-color: black;
    .under-line {
      width: 500px;
    }

    .buy123 {
      display: flex;
      font-size: 30px;
      padding-left: 12px;
      padding-top: 15px;
      p {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 4px;
      }
      .total-number {
        font-family: Prohibition;
        font-size: 45px;
        margin-left: 18px;
      }
    }

    .pcone {
      padding: 0 0 12px 12px;
    }

    .style-line::before {
    }
  }
`;
