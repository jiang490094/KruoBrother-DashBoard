import { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { GlobalContext } from "../provider/globalprovider";

const ProgressiveBar = styled.div`
  margin: 0 auto;
  background: rgba(128, 136, 142, 0.4);
  border-radius: 8px;
  width: 80%;
  height: 20px;
  overflow: hidden;
  border: none;
  box-shadow: 0px 0px 2px white;
  .bar-inner {
    width: ${(props) => props.status}%;
    height: 20px;
    background: linear-gradient(
      48deg,
      rgba(255, 107, 0, 0.8071603641456583) 0%,
      rgba(255, 0, 0, 1) 100%
    );
    box-shadow: inset 0px 0px 10px white;
    border-radius: 8px;
    transition: width 3s;
  }
`;
const Ranking = ({ className }) => {
  const { rankDisplay } = useContext(GlobalContext);
  return (
    <div className={className}>
      <div className="deceration">
        <div className="title">
          <span>TOP10 Ranking </span>
          <img src="Images/logo.svg" />
        </div>
        <div className="line">
          <div className="inline-one"></div>
          <div className="inline-two"></div>
          <div className="inline-three"></div>
        </div>
      </div>
      <div className="content">
        {rankDisplay.length > 0 &&
          rankDisplay.map((item, key) => {
            if (!item?.item_name) return <></>;
            const progress =
              key === 0
                ? 100
                : Math.round((item?.amount / rankDisplay[0]?.amount) * 100);
            const amount = item?.amount.toLocaleString(undefined);
            return (
              <div key={key} className="info-card">
                <div className="info">
                  <div className="rank-info">
                    <div className={`rank ${item?.site}`}>
                      {key < 9 && 0}
                      {key + 1}
                    </div>
                    <div className="item-name">{item.item_name}</div>
                  </div>
                  <div className="count">
                    <span className="count-title">銷售金額</span>
                    <div className="count-amount"> $ {amount}</div>
                  </div>
                </div>
                <ProgressiveBar status={progress === 0 ? 1 : progress}>
                  <div className="bar-inner"></div>
                </ProgressiveBar>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default styled(Ranking)`
  color: white;
  position: fixed;
  left: 40px;
  z-index: 900;
  width: 23vw;
  height: 100vh;
  padding: 30px 0 20px 20px;
  .logo {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    font-size: 32px;
    font-family: Open Sans;
  }
  .deceration {
    width: 100%;
    height: 47px;

    .title {
      display: flex;
      align-items: flex-end;
      font-size: 40px;
      font-family: Prohibition;
      margin-bottom: 10px;
      height: 40px;
      /* justify-content: space-between; */
      img {
        height: 30px;
        margin-left: auto;
        transform: translateY(10px);
      }
    }
    .line {
      width: 100%;
      display: flex;
      height: 3px;
      align-items: flex-end;
      .inline-one {
        width: 34px;
        height: 100%;
        background-color: white;
        margin-left: 5px;
      }
      .inline-two {
        width: calc(100% - 60px);
        height: 1px;
        background: rgba(255, 255, 255, 0.5);
      }
      .inline-three {
        width: 12px;
        height: 100%;
        background-color: #ff6241;
      }
    }
  }
  .content {
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    .info-card {
      margin-bottom: 25px;
    }
    .info {
      display: flex;
      height: fit-content;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .rank-info {
        display: flex;
        align-items: center;
        height: 25px;
        .rank {
          font-size: 20px;
          line-height: 30px;
          width: 30px;
          height: 30px;
          border: 1px solid white;
          text-align: center;
        }
        .buy123 {
          box-shadow: 0 0 5px #ff6b00;
        }
        .pcone {
          box-shadow: 0 0 5px #ff0000;
        }
        .item-name {
          margin-left: 20px;
          color: whtie;
          width: 220px;
          max-height: 40px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .count {
        display: flex;
        flex-direction: column;
        text-align: end;
        font-family: Prohibition;
        width: fit-content;
        .count-title {
          font-size: 13px;
        }
        .count-amount {
          font-size: 30px;
        }
      }
    }
  }
`;

Ranking.propTypes = {
  className: PropTypes.string.isRequired
};
