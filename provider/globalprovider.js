import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData, { saveItem, loadItem } from "../util";

export const GlobalContext = createContext({});
let RankData = [];
let rank = {};
let rankDisplay = [];
let cityData = {};
let total = {};
let totalPrice = 0;
let show = false;
let buy123Category = {};
let buy123Categories = [];
let openRecords = [];
let displayIncome = 0;
let buy123Sum = 0;
let pconeSum = 0;
let IsFetchRank = false;
saveItem([], "opened");
const base = 1000000;
let pconeCategory = {};
let pconeCategories = [];

const Globalprovider = ({ children }) => {
  const [heartBeat, setHearBeat] = useState(0);

  useEffect(() => {
    const timerID = setInterval(() => {
      setHearBeat((prev) => prev + 1);
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  useEffect(() => {
    const number = document.getElementById("countUpRef");
    const buy123Number = document.getElementById("buy123CountUP");
    const pconeNumber = document.getElementById("pconeCountUp");

    let currentIncome = number.innerText;
    let currentBuyIncome = buy123Number.innerText;
    let currentPconeIncome = pconeNumber.innerText;

    currentIncome = parseInt(
      currentIncome.replace("$", "").replaceAll(",", "")
    );
    buy123Sum = parseInt(currentBuyIncome.replace("$", "").replaceAll(",", ""));
    pconeSum = parseInt(
      currentPconeIncome.replace("$", "").replaceAll(",", "")
    );
    for (let i = 10; i > 0; i--) {
      const goal = i * base;

      if (currentIncome / goal > 1) {
        const records = loadItem("opened");
        const IsAlreadyOpen = records.includes(i);
        if (IsAlreadyOpen) {
          return;
        } else {
          openRecords.push(i);
          saveItem(openRecords, "opened");
          displayIncome = goal;
          // console.log("aloha");
          show = true;
          setTimeout(() => {
            show = false;
          }, 12000);
          return;
        }
      }
    }
  }, [heartBeat]);

  const fetchAll = async (timer) => {
    if (timer % 30 === 0) {
      const alldata = await fetchData(
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/get_revenue_by_day "
      );

      cityData = alldata?.data?.city;
      total = alldata?.data?.total;
      totalPrice = alldata?.data?.total?.revenue;
    } else {
      return;
    }
  };
  const fetchRank = async () => {
    if (RankData.length === 0 && !IsFetchRank) {
      IsFetchRank = true;
      const prodRow = await fetchData(
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/get_buyer_info"
      );
      const newData = prodRow?.data;
      RankData = RankData.concat(newData);
      IsFetchRank = false;
    }
  };
  useEffect(() => {
    if (RankData.length === 0) {
      fetchRank();
    }
  }, [heartBeat]);

  useEffect(() => {
    const nextObj = RankData.shift();
    let newObject = { ...rank };
    if (nextObj?.item_id in newObject) {
      newObject[nextObj?.item_id].amount += parseInt(nextObj?.amount);
    } else {
      newObject[nextObj?.item_id] = {};
      newObject[nextObj?.item_id].amount = parseInt(nextObj?.amount);
      newObject[nextObj?.item_id].item_name = nextObj?.item_name;
      newObject[nextObj?.item_id].site = nextObj?.site;
    }
    rank = newObject;
    const newArray = Object.values(newObject);

    newArray.sort(function (a, b) {
      return b.amount - a.amount;
    });
    const finalArray = newArray.slice(0, 10);
    rankDisplay = finalArray;
    fetchAll(heartBeat);
  }, [heartBeat]);

  useEffect(() => {
    const nextObj = RankData.shift();
    // console.log("nextObj", nextObj);
    if (!nextObj) return;
    let buy123List = { ...buy123Category };
    let pconeList = { ...pconeCategory };
    // console.log("asdsadsadsada", buy123List, pconeList);

    // let buy123Amount = [];
    // console.log("aa", buy123Amount);
    // Object.assign(nextObj, { percent: "" });
    nextObj["percent"] = 0;
    // console.log(nextObj);
    if (nextObj?.site === "buy123") {
      // console.log()
      if (!(nextObj?.category_name in buy123List)) {
        buy123List[nextObj?.category_name] = {}; //接上api後換成分類id
        buy123List[nextObj?.category_name].category_name =
          nextObj.category_name;
        buy123List[nextObj?.category_name].site = nextObj.site;
        buy123List[nextObj?.category_name].amount = 0;
      }
      buy123List[nextObj?.category_name].amount += parseInt(nextObj?.amount);
      buy123List[nextObj?.category_name].percent =
        (buy123List[nextObj?.category_name].amount / buy123Sum) * 10000;
    }
    buy123Category = buy123List;

    if (nextObj?.site === "pcone") {
      if (!(nextObj?.category_name in pconeList)) {
        pconeList[nextObj?.category_name] = {};
        pconeList[nextObj?.category_name].category_name =
          nextObj?.category_name;
        pconeList[nextObj?.category_name].site = nextObj.site;
        pconeList[nextObj?.category_name].amount = 0;
        pconeList[nextObj?.category_name].percent = 0;
      }
      pconeList[nextObj?.category_name].amount += parseInt(nextObj?.amount);
      pconeList[nextObj?.category_name].percent =
        (pconeList[nextObj?.category_name].amount / pconeSum) * 100;
    }
    pconeCategory = pconeList;

    const newBuy123 = Object.values(buy123List);
    const newPcone = Object.values(pconeList);

    newBuy123.sort(function (a, b) {
      return b.amount - a.amount;
    });
    newPcone.sort(function (a, b) {
      return b.amount - a.amount;
    });
    const finalBuy123 = newBuy123.slice(0, 10);
    const finalPcone = newPcone.slice(0, 10);

    buy123Categories = finalBuy123;
    pconeCategories = finalPcone;

    // console.log("buy123Categories", buy123Categories);
    // console.log("pconeCategories", pconeCategories);
  }, [heartBeat]);

  return (
    <GlobalContext.Provider
      value={{
        heartBeat,
        rankDisplay,
        cityData,
        total,
        show,
        buy123Categories,
        totalPrice,
        displayIncome,
        buy123Sum,
        pconeSum,
        pconeCategories
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default Globalprovider;
Globalprovider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};
