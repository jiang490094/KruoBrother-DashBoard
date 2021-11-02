import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

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
      color: #0091ea;
      opacity: 0.5;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    &:nth-child(3) {
      color: #ff9100;
      opacity: 0.5;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    &:nth-child(4) {
      -webkit-text-stroke-width: 3px;
      color: white;
    }
  }
`;
const Celebrate = ({ className }) => {
  let number = 100000000;
  const displayNum = number.toLocaleString(undefined);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 12000);
  }, []);
  useEffect(() => {
    const incomeText = document.getElementsByClassName("income");
    for (let i = 0; i < incomeText.length; i++) {
      incomeText[i].style.animtionDuration = "2s";
      incomeText[i].style.animationDelay = `${0.8 - i / 4}s`;
    }
  }, []);

  if (!open) {
    return null;
  }
  return (
    <div className={className}>
      <Container>
        <span className="income">${displayNum}</span>
        <span className="income">${displayNum}</span>
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
