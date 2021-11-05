import PropTypes from "prop-types";
import styled from "styled-components";
import CountUp from "react-countup";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

const Title = ({ className }) => {
  const { totalPrice } = useContext(GlobalContext);
  return (
    <div className={className}>
      <div className="wording">
        <p className="title-words">Total</p>
      </div>
      <div className="title-number" id="countUpRef">
        $ <CountUp start={0} duration={300} separator="," end={totalPrice} />
        <div className="amount-line"></div>
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
  left: 50%;
  margin-left: -360px;
  top: 20px;
  z-index: 1;
  color: white;

  .wording {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .amount-line {
    width: 500px;
    height: 7px;
    background: linear-gradient(0.25turn, #ff6b00 50%, #f7422f 50%);
    margin-top: 20px;
    border-radius: 4px;
  }
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
    letter-spacing: 10px;
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
