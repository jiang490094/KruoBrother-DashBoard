import PropTypes from "prop-types";
import styled from "styled-components";
import CountUp from "react-countup";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

const AmountLine = styled.div`
  width: 550px;
  height: 9px;
  background: ${(props) => {
    return `linear-gradient(0.25turn, #ff6a00 ${props.buy123}%, #f8331d ${props.pcone}%);`;
  }};
  margin-top: 20px;
  border-radius: 4px;
  transition: 0.3s;
`;

const Title = ({ className }) => {
  const { totalPrice, buy123Sum, pconeSum } = useContext(GlobalContext);
  const lineTotal = buy123Sum + pconeSum;
  const buy123_percent =
    Math.floor((buy123Sum / lineTotal) * 10000) / 100
      ? Math.floor((buy123Sum / lineTotal) * 10000) / 100
      : 100;
  const pcone_percent = 100 - buy123_percent ? 100 - buy123_percent : 0;

  return (
    <div className={className}>
      <div className="wording">
        <p className="title-words">Total</p>
      </div>
      <div className="title-number" id="countUpRef">
        $ <CountUp start={0} duration={300} separator="," end={totalPrice} />
        <AmountLine buy123={buy123_percent} pcone={pcone_percent} />
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
