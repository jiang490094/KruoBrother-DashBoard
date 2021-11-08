import PropTypes from "prop-types";
import { useContext } from "react";
import styled, { keyframes } from "styled-components";

import { GlobalContext } from "../provider/globalprovider";

const breatheAnimation = keyframes`
 0% { transform:translateY(-70px) }
 50% { transform:translateY(-50px) }
 100% {transform:translateY(-70px)}
`;
const Container = styled.div`
  position: fixed;
  width: 850px;
  bottom: 30px;
  height: 40px;
  left: 26vw;
  transform: scale(0.8);
  .progress-bar {
    height: 100%;
    display: flex;
    align-items: center;
    color: white;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  .node {
    transition: 0.3s;
    width: 15px;
    height: 15px;
    border-radius: 20px;
    background: ${(props) => (props.active ? "#80ffee90" : "transparent")};
    border: 4px solid ${(props) => (props.active ? "#80ffee" : "#807f7f")};
    backdrop-filter: saturate(180%) blur(10px);
    box-shadow: 0 0 15px ${(props) => (props.active ? "white" : "transparent")};
    position: relative;
    .open {
      position: absolute;
      left: -10px;
      transform-origin: center;
      transform: translateY(-70px) scale(1);
      width: 30px;
      height: 30px;
      /* border: 3px dotted orange; */
      font-size: 24px;
      border-radius: 50%;
      font-family: Prohibition;
      transition: all 1s;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      animation-name: ${breatheAnimation};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      box-shadow: 0 0 5px 5px #fff, /* inner white */ 0 0 5px 6px gold,
        /* middle magenta */ 0 0 5px 5px #0ff; /* outer cyan */
      background-color: ${(props) =>
        props.active ? "#80ffee50" : "transparent"};
      img {
        width: 20px;
        height: 20px;
      }
    }
    .close {
      transform: scale(0);
    }
  }

  .line {
    transition: 0.3s;
    width: 61px;
    height: 3px;
    border-radius: 5px;
    background: ${(props) => (props.active ? "#807f7f" : "#807f7f")};
  }
`;

const ActiveLineContainer = styled.div`
  position: absolute;
  left: 23px;
  transition: 0.3s;
  /* width: 44px; */
  width: ${(props) => {
    return props.percent * 61 + "px";
  }};
  height: 5px;
  border-radius: 2px;
  background: #80ffee;
`;

const ActiveLine = ({ percent }) => {
  return <ActiveLineContainer percent={percent >= 1 ? 1 : percent} />;
};

ActiveLine.propTypes = {
  percent: PropTypes.number.isRequired
};

const MileStone = () => {
  const { buy123Sum, pconeSum } = useContext(GlobalContext);

  const totalPrice = buy123Sum + pconeSum;

  const milestones = [
    1,
    10000000,
    20000000,
    30000000,
    40000000,
    50000000,
    60000000,
    70000000,
    80000000,
    90000000,
    100000000
  ];
  return (
    <Container>
      <div className="progress-bar">
        {milestones.map((milestone, index) => {
          return (
            <Wrapper
              key={index}
              active={totalPrice >= milestone}
              percent={totalPrice / milestones[10]}
              index={index}
            >
              <div className="node">
                {index > 0 && (
                  <div
                    className={` ${totalPrice >= milestone ? "open" : "close"}`}
                  >
                    {index < 10 && <div>{index}</div>}
                    {index === 10 && <img src="Images/crown.svg" />}
                  </div>
                )}
              </div>
              {index >= 0 && index < 10 ? <div className="line" /> : null}
              {index >= 0 && index < 10 ? (
                <ActiveLine
                  percent={
                    totalPrice - milestones[index] > 0
                      ? (totalPrice - milestones[index]) / 1000000
                      : 0
                  }
                />
              ) : null}{" "}
            </Wrapper>
          );
        })}
      </div>
    </Container>
  );
};

export default MileStone;
