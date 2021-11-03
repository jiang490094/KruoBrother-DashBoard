import PropTypes from "prop-types";
import styled from "styled-components";
import { useCountUp } from "react-countup";
import { useContext } from "react";

import { loadItem } from "../util";
import { GlobalContext } from "../provider/globalprovider";

const Title = ({ className }) => {
  const { totalPrice } = useContext(GlobalContext);
  let lastTime = parseInt(loadItem("lastAmount") - 5000);
  if (lastTime < 0) lastTime = 0;

  useCountUp({
    ref: "countUpRef",
    start: lastTime,
    end: totalPrice,
    duration: 300,
    separator: ","
  });
  return (
    <div className={className}>
      <div>
        <p className="tiny-words">即時監視 15m-</p>
        <p className="title-words">總交易額</p>
        <img src="Images/title-total-line.png" />
      </div>
      <div className="title-number">
        $ <span id="countUpRef" className="income-all-number" />
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
    text-shadow: 0 0 10px rgb(255 153 0), 0 0 10px rgb(255 153 0),
      0 0 10px rgb(255 153 0);
  }

  img {
    margin: -10px 0 0 -16px;
    width: 208px;
  }
`;
