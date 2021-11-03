import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { RankData } from "../textCase/testCase";

export const GlobalContext = createContext({});

const Globalprovider = ({ children }) => {
  const [heartBeat, setHearBeat] = useState(0);
  const [rank, setRank] = useState({});
  const [rankDisplay, setRankDisplay] = useState([]);
  //   function fetchData() {
  //     return fetch("https://data.cityofnewyork.us/resource/tg4x-b46p.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         return data;
  //       });
  //   }
  useEffect(() => {
    const timerID = setInterval(() => {
      setHearBeat((prev) => prev + 1);
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  useEffect(() => {
    const fetchAll = async () => {
      const alldata = await fetch(
        "https://alansun-nimda.dev.kuobrothers.com/api/get_revenue_by_day"
      )
        .then((response) => response.json())
        .then((data) => {
          return data;
        });
      console.log(123, alldata);

      return alldata;
    };
    fetchAll();
  }, []);
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
  }, [heartBeat]);

  return (
    <GlobalContext.Provider value={{ heartBeat, rankDisplay }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Globalprovider;
Globalprovider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};
