import styled from "styled-components";
import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

const Info = styled.div`
  position: absolute;
  left: ${(props) => props.poxitionX + "px"};
  top: ${(props) => props.poxitionY + "px"};

  .vector {
    transform: translateY(-20px);
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
    .perstange,
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
    .perstange {
      text-align: center;
      position: absolute;
      top: 40px;
      left: 32px;
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
  let number = 9998898;
  const displayNum = number.toLocaleString(undefined);

  let x = poxitionX;
  let y = poxitionY;
  let cx = 50;
  let cy = -130;
  let countryName = country;
  switch (country) {
    case "#Keelung":
      x = x + 20;
      y = y + 5;
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
      x = x + 150;
      y = y + 180;
      countryName = "宜蘭市";
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
      countryName = "苗栗市";
      break;
    case "#Taichung":
      x = x + 80;
      y = y + 90;
      countryName = "台中市";
      break;
    case "#Nantou":
      x = x + 120;
      y = y + 150;
      countryName = "南投市";
      break;
    case "#Hualian":
      x = x + 220;
      y = y + 150;
      countryName = "花蓮市";
      break;
    case "#Yunlin":
      x = x + 110;
      y = y + 5;
      countryName = "雲林市";
      break;
    case "#Changhua":
      x = x + 80;
      y = y + 180;
      countryName = "彰化市";
      break;
    case "#Chiayi-city":
      x = x + 5;
      y = y + 5;
      countryName = "嘉義市";
      break;
    case "#Chiayi":
      x = x + 105;
      y = y + 100;
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
      countryName = "台東市";
      break;
    case "#Pingtung":
      x = x + 100;
      y = y + 250;
      countryName = "屏東市";
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
  console.log(country);
  console.log(x, y);
  return (
    <Info poxitionX={x} poxitionY={y} ref={infoRef} cx={cx} cy={cy}>
      <img src="Images/buy123/point.svg" className="point" />
      <img src="Images/buy123/Vector.svg" className="vector" />
      <div className="info-container">
        <img src="Images/buy123/info-bar.svg" className="info" />
        <div className="info-detail">
          <img src="Images/pcone-icon.svg" />
          <div>${displayNum}</div>
        </div>
        <div className="info-detail">
          <img src="Images/buy123-icon.svg" />
          <div>$ {displayNum}</div>
        </div>
        <div className="country">{countryName}銷售額</div>
        <div className="perstange">
          <div className="title">全台占比</div>
          23%
        </div>
      </div>
    </Info>
  );
};
export default styled(InfoCard)`
  .point {
    position: absolute;
    left: ${(props) => props.poxitionX + "px"};
    top: ${(props) => props.poxitionY + "px"};
  }
`;

InfoCard.propTypes = {
  className: PropTypes.string.isRequired,
  poxitionX: PropTypes.number.isRequired,
  poxitionY: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired
};
