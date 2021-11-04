import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import dayjs from "dayjs";

const Time = ({ className }) => {
  const nowDate = dayjs().format("MM/DD/YYYY");
  const today = dayjs().day();
  const dayList = ["日", "一", "二", "三", "四", "五", "六"];
  let [now, setNow] = useState();
  let word = "";

  useEffect(() => {
    const timerID = setInterval(() => {
      setNow(dayjs().format("HH:mm:ss"));
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [now]);

  if (nowDate === "11/11/2021") {
    word = "決戰當日";
  } else {
    let day = dayjs("11/11/2021").diff(nowDate, "day");
    word = `還剩${day}日`;
  }

  return (
    <>
      <div className={className}>
        <span className="now">{nowDate}</span>
        <span className="now now-time">{now}</span>
        <span className="today">
          {word} 星期{dayList[today]}
        </span>
      </div>
      <img src="/Images/line.png"></img>
    </>
  );
};

Time.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(Time)`
  width: 500px;
  font-family: Prohibition;
  color: white;
  position: relative;
  right: -25px;
  margin-bottom: 24px;
  margin-top: 30px;
  .now {
    font-size: 32px;
    margin-right: 15px;
  }
  .now-time::after {
    content: "";
    position: absolute;
    top: 5px;
    left: 251px;
    background: rgba(255, 255, 255, 0.3);
    width: 2px;
    height: 23px;
  }

  .today {
    font-size: 32px;
    position: absolute;
    left: 266px;
    font-weight: 600;
  }
`;
