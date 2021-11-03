import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData, { saveItem, loadItem } from "../util";
import { RankData } from "../textCase/testCase";

export const GlobalContext = createContext({});
let rank = {};
let rankDisplay = [];
let cityData = {};
let total = {};
let totalPrice = 0;
let show = false;
let category = {};
let categories = [];
let openRecords = [];
let displayIncome = 0;
saveItem([], "opened");
// const priceArray = [8000000, 4000000];
const Globalprovider = ({ children, moduleData }) => {
  const [heartBeat, setHearBeat] = useState(0);
  cityData = moduleData?.city;
  total = moduleData?.total;
  totalPrice = total?.buy123?.amount + total?.pcone?.amount;

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
    let currentIncome = number.textContent;
    currentIncome = parseInt(currentIncome.replaceAll(",", ""));
    // priceArray.forEach((item, index) => {
    //   if (currentIncome / item > 1) {
    //     const records = loadItem("opened");
    //     const IsAlreadyOpen = records.includes(index);
    //     displayIncome = item;
    //     if (IsAlreadyOpen) {
    //       return;
    //     } else {
    //       openRecords.push(index);
    //       saveItem(openRecords, "opened");
    //       console.log("aloha");
    //       show = true;
    //       setTimeout(() => {
    //         show = false;
    //       }, 12000);
    //       return;
    //     }
    //   } else {
    //     return;
    //   }
    // });
    if (currentIncome / 8000000 > 1) {
      const records = loadItem("opened");
      const IsAlreadyOpen = records.includes(2);
      displayIncome = 8000000;
      if (IsAlreadyOpen) {
        return;
      } else {
        openRecords.push(2);
        saveItem(openRecords, "opened");
        console.log("ohiyo");
        show = true;
        setTimeout(() => {
          show = false;
        }, 12000);
        return;
      }
    }
    if (currentIncome / 4000000 > 1) {
      const records = loadItem("opened");
      const IsAlreadyOpen = records.includes(1);
      displayIncome = 4000000;
      if (IsAlreadyOpen) {
        return;
      } else {
        openRecords.push(1);
        saveItem(openRecords, "opened");
        console.log("ohiyo");
        show = true;
        setTimeout(() => {
          show = false;
        }, 12000);
        return;
      }
    }
  }, [heartBeat]);

  const fetchAll = async (timer) => {
    if (timer % 30 === 0) {
      const alldata = await fetchData();
      cityData = alldata?.data?.city;
      total = alldata?.data?.total;
      const NewtotalPrice = total?.buy123?.amount + total?.pcone?.amount;
      totalPrice = NewtotalPrice;
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
    let categoryList = { ...category };

    if (nextObj?.category_name in categoryList) {
      categoryList[nextObj?.category_name].amount += parseInt(nextObj?.amount);
    } else {
      categoryList[nextObj?.category_name] = {};
      categoryList[nextObj?.category_name].amount = parseInt(nextObj?.amount);
      categoryList[nextObj?.category_name].category_name =
        nextObj?.category_name;
    }
    category = categoryList;

    const newArray = Object.values(categoryList);

    newArray.sort(function (a, b) {
      return b.amount - a.amount;
    });
    categories = finalArray;
    const finalArray = newArray.slice(0, 10);
  }, [heartBeat]);

  return (
    <GlobalContext.Provider
      value={{
        heartBeat,
        rankDisplay,
        cityData,
        total,
        show,
        categories,
        totalPrice,
        displayIncome
      }}
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
