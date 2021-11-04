import PropTypes from "prop-types";
import styled from "styled-components";
import CountUp from "react-countup";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

const Title = ({ className }) => {
  const { totalPrice } = useContext(GlobalContext);
  return (
    <div className={className}>
      <div>
        <p className="tiny-words">即時監視 15m-</p>
        <p className="title-words">總交易額</p>
        <img src="Images/title-total-line.png" />
      </div>
      <div className="title-number" id="countUpRef">
        $ <CountUp start={0} duration={300} separator="," end={totalPrice} />
      </div>
    </div>
  );
};

Title.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(Title)`
  display: flex;
  position: fixed;
  left: 571px;
  top: 6px;
  z-index: 1;
  color: white;
  .title-words {
    font-size: 32px;
    margin-top: 8px;
  }
  .tiny-words {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
    margin-right: 15px;
    margin-top: 16px;
  }

  .title-number {
    margin-left: 30px;
    font-family: Prohibition;
    font-size: 100px;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 0 10px #ff5500, 0 0 15px #00ffef, 0 0 20px #ff5500;
  }

  img {
    margin: -10px 0 0 -16px;
    width: 208px;
  }
`;
