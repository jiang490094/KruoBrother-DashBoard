import { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "../provider/globalprovider";

const Container = styled.div`
  position: fixed;
  width: 850px;
  bottom: 30px;
  height: 40px;
  left: 26vw;

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

  .node {
    transition: 0.3s;
    width: 15px;
    height: 15px;
    border-radius: 20px;
    background: ${(props) => (props.active ? "#80ffee50" : "transparent")};
    border: 4px solid ${(props) => (props.active ? "#80ffee" : "#807f7f")};
    backdrop-filter: saturate(180%) blur(10px);
  }

  .line {
    transition: 0.3s;
    width: 61px;
    height: 3px;
    border-radius: 5px;
    background: ${(props) => (props.active ? "#807f7f" : "#807f7f")};
  }
`;

const ActiveLine = styled.div`
  transition: 0.3s;
  width: ${(props) => {
    console.log(props.percent);
    return 850 * props.percent + "px";
  }};
  height: 5px;
  border-radius: 2px;
  background: #80ffee;
  position: fixed;
`;

const MileStone = () => {
  const { buy123Sum, pconeSum } = useContext(GlobalContext);

  const totalPrice = buy123Sum + pconeSum;

  const milestones = [
    0,
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
        <ActiveLine percent={totalPrice / milestones[10]} />
        {milestones.map((milestone, index) => {
          return (
            <Wrapper key={index} active={totalPrice >= milestone}>
              {index > 0 ? <div className="line" /> : null}
              <div className="node" />
            </Wrapper>
          );
        })}
      </div>
    </Container>
  );
};

export default MileStone;
