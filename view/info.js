import styled from "styled-components";
import PropTypes from "prop-types";
import { useRef, useEffect, useState, useContext } from "react";
import CountUp from "react-countup";

import { GlobalContext } from "../provider/globalprovider";

const Info = styled.div`
  position: absolute;
  left: ${(props) => props.poxitionX + "px"};
  top: ${(props) => props.poxitionY + "px"};

  .vector {
    transform: ${(props) =>
      `translate(${props.vx}px,${props.vy}px) rotate(${props.vr}deg)`};
  }
  .info-container {
    position: relative;
    transform: ${(props) => `translate(${props.cx}px,${props.cy}px)`};
    width: 400px;
    height: fit-content;
    padding-bottom: 20px;
    background: rgba(88, 160, 153, 0.2);
    backdrop-filter: saturate(180%) blur(10px);
    border-radius: 20px;
    box-shadow: inset 0px 0px 15px orange;
    border: 1px solid white;
    .percentage,
    .country {
      font-size: 30px;
      font-weight: 600;
      color: white;
      font-family: "Open Sans", sans-serif;
    }
    .country {
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-30%);
    }
    .percentage {
      text-align: center;
      position: absolute;
      top: 40px;
      left: 32px;
      font-family: Prohibition;
      .title {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }
    .info-detail {
      display: flex;
      align-items: center;
      font-size: 36px;
      color: rgba(255, 255, 255, 0.8);
      margin-left: 103.32px;
      font-family: "Prohibition";
      img {
        width: 30px;
        height: 30px;
        margin-right: 17px;
      }
    }
  }
`;
const InfoCard = ({ country, poxitionX, poxitionY }) => {
  const infoRef = useRef(null);
  const [InfoNumber, setInfoNumber] = useState({
    percentage: 0,
    buyAmount: 0,
    pconeAmout: 0
  });
  const { cityData } = useContext(GlobalContext);
  let x = poxitionX;
  let y = poxitionY;
  let cx = 50;
  let cy = -130;
  let vx = 0;
  let vy = -20;
  let vr = 0;
  let countryName = country;
  switch (country) {
    case "#Keelung":
      x = x + 20;
      y = y + 5;
      cx = -420;
      cy = -160;
      vx = -45;
      vr = 90;
      countryName = "基隆市";
      break;
    case "#Taipei":
      x = x + 18;
      y = y + 35;
      countryName = "台北市";
      break;
    case "#Newtaipei":
      x = x + 80;
      y = y + 180;
      countryName = "新北市";
      break;
    case "#Yilan":
      x = x + 100;
      y = y + 220;
      cx = -100;
      cy = -280;
      vx = -10;
      vy = -25;
      vr = 150;
      countryName = "宜蘭縣";
      break;
    case "#Taoyuan":
      x = x + 120;
      y = y + 80;
      countryName = "桃園市";
      break;
    case "#Hsinchu-city":
      x = x + 8;
      y = y + 8;
      countryName = "新竹市";
      break;
    case "#Hsinchu":
      x = x + 80;
      y = y + 80;
      countryName = "新竹縣";
      break;
    case "#Miaoli":
      x = x + 90;
      y = y + 80;
      countryName = "苗栗縣";
      break;
    case "#Taichung":
      x = x + 80;
      y = y + 90;
      countryName = "台中市";
      break;
    case "#Nantou":
      x = x + 120;
      y = y + 150;
      countryName = "南投縣";
      break;
    case "#Hualian":
      x = x + 220;
      y = y + 280;
      cx = -150;
      cy = -280;
      vx = -20;
      vy = -30;
      vr = 150;
      countryName = "花蓮縣";
      break;
    case "#Yunlin":
      x = x + 110;
      y = y + 5;
      countryName = "雲林縣";
      break;
    case "#Changhua":
      x = x + 80;
      y = y + 180;
      countryName = "彰化縣";
      break;
    case "#Chiayi-city":
      x = x + 15;
      y = y + 5;
      cx = 10;
      cy = 20;
      vx = -10;
      vy = 20;
      vr = 270;
      countryName = "嘉義市";
      break;
    case "#Chiayi":
      x = x + 105;
      y = y + 100;
      cx = 10;
      cy = 20;
      vx = -10;
      vy = 20;
      vr = 270;
      countryName = "嘉義縣";
      break;
    case "#Tainan":
      x = x + 75;
      y = y + 100;
      countryName = "台南市";
      break;
    case "#Kaohsiung":
      x = x + 250;
      y = y + 200;
      countryName = "高雄市";
      break;
    case "#Taidon":
      x = x + 150;
      y = y + 300;
      cx = -150;
      cy = -280;
      vx = -20;
      vy = -30;
      vr = 150;
      countryName = "台東縣";
      break;
    case "#Pingtung":
      x = x + 100;
      y = y + 250;
      countryName = "屏東縣";
      break;
  }

  const PositionChange = () => {
    setTimeout(() => {
      infoRef.current.style.display = "none";
    }, 3000);

    setTimeout(() => {
      infoRef.current.style.display = "block";
    }, 5000);
  };
  useEffect(() => {
    if (!cityData) return;
    const cityAmount = cityData[countryName];
    let InfoData = {
      percentage: 0,
      buyAmount: 0,
      pconeAmout: 0
    };
    const buyAmount = cityAmount?.buy123?.amount || 0;
    const pconeAmout = cityAmount?.pcone?.amount || 0;
    InfoData.percentage = cityAmount?.percentage || 0;
    InfoData.buyAmount = buyAmount;
    InfoData.pconeAmout = pconeAmout;
    setInfoNumber(InfoData);
    if (infoRef.current) {
      if (country === "#Miaoli") {
        PositionChange();
      }
      if (country === "#Yunlin") {
        PositionChange();
      }
      if (country === "#Pingtung") {
        PositionChange();
      }
    }
  }, [poxitionX]);
  if (!cityData) {
    return null;
  }
  return (
    <Info
      poxitionX={x}
      poxitionY={y}
      ref={infoRef}
      cx={cx}
      cy={cy}
      vx={vx}
      vy={vy}
      vr={vr}
    >
      <img src="Images/buy123/point.svg" className="point" />
      <img src="Images/buy123/Vector.svg" className="vector" />
      <div className="info-container">
        <img src="Images/buy123/info-bar.svg" className="info" />
        <div className="info-detail">
          <img src="Images/pcone-icon.svg" />

          <div>
            ${" "}
            <CountUp
              start={0}
              end={InfoNumber?.pconeAmout}
              duration={2}
              separator=","
            />
          </div>
        </div>
        <div className="info-detail">
          <img src="Images/buy123-icon.svg" />
          <div>
            ${" "}
            <CountUp
              start={0}
              end={InfoNumber?.buyAmount}
              duration={2}
              separator=","
            />
          </div>
        </div>
        <div className="country">{countryName}銷售額</div>
        <div className="percentage">
          <div className="title">全台占比</div>
          {InfoNumber?.percentage}%
        </div>
      </div>
    </Info>
  );
};
export default InfoCard;

InfoCard.propTypes = {
  className: PropTypes.string.isRequired,
  poxitionX: PropTypes.number.isRequired,
  poxitionY: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired
};
