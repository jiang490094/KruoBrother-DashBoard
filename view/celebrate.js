import { useContext } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import { GlobalContext } from "../provider/globalprovider";

const breatheAnimation = keyframes`
0%{
    transform: translate(-50%, -45%) scale(1);
}
40%{
    transform: translate(-50%, -50%) scale(1.2);
}
50%{
    transform: translate(-50%, -50%) scale(1.2);
}
90%{
    transform: translate(-50%, -45%) scale(1);
}
100%{
    transform: translate(-50%, -45%) scale(1);
}
`;

const Container = styled.div`
  position: relative;
  .income {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -20%);
    font-size: 16vw;
    animation-name: ${breatheAnimation};
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 2s;
    animation-delay: 0.8s;
    font-family: "Prohibition", cursive;
    -webkit-text-stroke-color: black;
    &:nth-child(1) {
      color: #7c4dff;
      opacity: 0.5;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    &:nth-child(2) {
      -webkit-text-stroke-width: 3px;
      color: white;
    }
  }
`;
const Celebrate = ({ className }) => {
  const { show, total } = useContext(GlobalContext);
  const displayNum = (
    total?.buy123?.amount + total?.pcone?.amount
  ).toLocaleString(undefined);
  if (!show) return null;
  return (
    <div className={className}>
      <Container show={show}>
        <span className="income">${displayNum}</span>
        <span className="income">${displayNum}</span>
        <video autoPlay loop id="videotag" width="1920" height="1080">
          <source src="/video/celebrate.mp4" type="video/mp4" />
        </video>
      </Container>
    </div>
  );
};

export default styled(Celebrate)`
  position: fixed;
  z-index: 9999;
`;

Celebrate.propTypes = {
  className: PropTypes.string.isRequired
};
