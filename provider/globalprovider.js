import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData from "../util";
import { RankData } from "../textCase/testCase";

export const GlobalContext = createContext({});

const Globalprovider = ({ children, moduleData }) => {
  const [heartBeat, setHearBeat] = useState(0);
  const [rank, setRank] = useState({});
  const [rankDisplay, setRankDisplay] = useState([]);
  const [cityData, setCityData] = useState(moduleData?.city);
  const [total, setTotal] = useState(moduleData?.total);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timerID = setInterval(() => {
      setHearBeat((prev) => prev + 1);
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  useEffect(() => {
    const totalPrice = total?.buy123?.amount + total?.pcone?.amount;
    if (totalPrice / 100000 > 1) {
      setShow(true);
    }
    setTimeout(() => {
      setShow(false);
    }, 12000);
  }, [total]);

  const fetchAll = async (timer) => {
    if (timer % 30 === 0) {
      const alldata = await fetchData();
      setCityData(alldata?.data?.city);
      setTotal(alldata?.data?.total);
    } else {
      return;
    }
  };

  useEffect(() => {
    const nextObj = RankData.shift();
    let newObject = { ...rank };
    if (nextObj?.item_id in newObject) {
      newObject[nextObj?.item_id].amount += parseInt(nextObj?.amount);
    } else {
      newObject[nextObj?.item_id] = {};
      newObject[nextObj?.item_id].amount = parseInt(nextObj?.amount);
      newObject[nextObj?.item_id].item_name = nextObj?.item_name;
    }
    setRank(newObject);
    const newArray = Object.values(newObject);

    newArray.sort(function (a, b) {
      return b.amount - a.amount;
    });
    const finalArray = newArray.slice(0, 10);
    setRankDisplay(finalArray);
    fetchAll(heartBeat);
  }, [heartBeat]);

  return (
    <GlobalContext.Provider
      value={{ heartBeat, rankDisplay, cityData, total, show }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default Globalprovider;
Globalprovider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  moduleData: PropTypes.object.isRequired
};
