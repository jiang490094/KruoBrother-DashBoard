import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData, { saveItem, loadItem } from "../util";

export const GlobalContext = createContext({});
let RankData = [];
let buy123RankData = [];
let pconeRankData = [];
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
let buy123Sum = 1;
let pconeSum = 0;
let lastTotalPrice = 0;
let buy123CategorySum = 1;
let pconeCategorySum = 1;

let IsFetchRank = false;
let IsFetchCategoryRank = false;
saveItem([], "opened");
saveItem(lastTotalPrice, "lastTotal");

const base = 10000000;
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
      currentIncome.replaceAll("$", "").replaceAll(",", "")
    );
    buy123Sum = parseInt(
      currentBuyIncome.replaceAll("$", "").replaceAll(",", "")
    );
    pconeSum = parseInt(
      currentPconeIncome.replaceAll("$", "").replaceAll(",", "")
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
    if (timer === 10) {
      const alldata = await fetchData(
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/get_revenue_by_day "
      );
      saveItem(totalPrice, "lastTotal");
      cityData = alldata?.data?.city;
      total = alldata?.data?.total;
      totalPrice = alldata?.data?.total?.revenue;
    }

    if (totalPrice > 0 && timer % 30 === 0) {
      const alldata = await fetchData(
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/get_revenue_by_day "
      );
      saveItem(totalPrice, "lastTotal");
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
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/top_ten_items"
      );
      const newData = prodRow?.data;
      RankData = RankData.concat(newData);
      IsFetchRank = false;
    }
  };

  const fetchCategoryRank = async () => {
    if (
      buy123RankData.length === 0 &&
      pconeRankData.length === 0 &&
      !IsFetchCategoryRank
    ) {
      IsFetchCategoryRank = true;
      const prodRow = await fetchData(
        "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/top_ten_category"
      );
      buy123RankData = prodRow?.data?.buy123;
      pconeRankData = prodRow?.data?.pcone;
      IsFetchCategoryRank = false;
    }
  };

  useEffect(() => {
    if (heartBeat === 10 || heartBeat % 30 === 0) {
      if (RankData.length === 0) {
        fetchRank(heartBeat);
      }
      if (buy123RankData.length === 0 && pconeRankData.length === 0) {
        fetchCategoryRank(heartBeat);
      }
    }
  }, [heartBeat]);

  useEffect(() => {
    const nextObj = RankData.shift();
    if (!nextObj) return;
    const buy123NextObj = buy123RankData.shift();
    const pconeNextObj = pconeRankData.shift();

    let newObject = { ...rank };
    if (nextObj?.name in newObject) {
      // newObject[nextObj?.name].amount += parseInt(nextObj?.amount);
    } else {
      newObject[nextObj?.name] = {};
      newObject[nextObj?.name].amount = parseInt(nextObj?.amount);
      newObject[nextObj?.name].name = nextObj?.name;
      newObject[nextObj?.name].site = nextObj?.site;
    }
    rank = newObject;
    const newArray = Object.values(newObject);
    newArray.sort(function (a, b) {
      return b.amount - a.amount;
    });
    const finalArray = newArray.slice(0, 10);
    rankDisplay = finalArray;
    fetchAll(heartBeat);

    // --------------------category-------------------

    let buy123List = { ...buy123Category };
    let pconeList = { ...pconeCategory };
    let buy123SumArray = [];
    let pconeSumArray = [];

    buy123NextObj["percent"] = 0;
    if (buy123NextObj?.site === "buy123") {
      if (!(buy123NextObj?.category in buy123List)) {
        buy123List[buy123NextObj?.category] = {};
        buy123List[buy123NextObj?.category].category = buy123NextObj.category;
        buy123List[buy123NextObj?.category].site = buy123NextObj.site;
        buy123List[buy123NextObj?.category].amount = 0;
      }
      buy123List[buy123NextObj?.category].amount += parseInt(
        buy123NextObj?.amount
      );
      buy123List[buy123NextObj?.category].percent = 0;
    }
    buy123Category = buy123List;

    if (pconeNextObj?.site === "pcone") {
      if (!(pconeNextObj?.category in pconeList)) {
        pconeList[pconeNextObj?.category] = {};
        pconeList[pconeNextObj?.category].category = pconeNextObj?.category;
        pconeList[pconeNextObj?.category].site = nextObj.site;
        pconeList[pconeNextObj?.category].amount = 0;
        pconeList[pconeNextObj?.category].percent = 0;
      }
      pconeList[pconeNextObj?.category].amount += parseInt(
        pconeNextObj?.amount
      );
      pconeList[pconeNextObj?.category].percent = 0;
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
    for (let i = 0; i < buy123Categories.length; i++) {
      buy123SumArray.push(buy123Categories[i].amount);
    }
    for (let i = 0; i < pconeCategories.length; i++) {
      pconeSumArray.push(pconeCategories[i].amount);
    }
    buy123CategorySum = SumData(buy123SumArray);
    pconeCategorySum = SumData(pconeSumArray);
  }, [heartBeat]);

  function SumData(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

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
        pconeCategories,
        buy123CategorySum,
        pconeCategorySum
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
