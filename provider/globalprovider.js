import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData, { saveItem } from "../util";
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
const Globalprovider = ({ children, moduleData }) => {
  const [heartBeat, setHearBeat] = useState(0);
  cityData = moduleData?.city;
  total = moduleData?.total;
  totalPrice = total?.buy123?.amount + total?.pcone?.amount;

  // const [cityData, setCityData] = useState(moduleData?.city);
  // const [total, setTotal] = useState(moduleData?.total);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [show, setShow] = useState(false);
  // const [category, setCategory] = useState({});
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const timerID = setInterval(() => {
      setHearBeat((prev) => prev + 1);
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);
  useEffect(() => {
    // const NewtotalPrice = total?.buy123?.amount + total?.pcone?.amount;
    // totalPrice = NewtotalPrice;
    // setTotalPrice(totalPrice);
    const number = document.getElementById("countUpRef");
    console.log("income", number.textContent);
    // if (totalPrice / 4000000 > 1) {
    //   show = true;
    // }
    // setTimeout(() => {
    //   show = false;
    // }, 12000);
  }, [heartBeat]);

  const fetchAll = async (timer) => {
    if (timer % 30 === 0) {
      saveItem("lastAmount", totalPrice);
      const alldata = await fetchData();
      cityData = alldata?.data?.city;
      total = alldata?.data?.total;
      const NewtotalPrice = total?.buy123?.amount + total?.pcone?.amount;
      totalPrice = NewtotalPrice;
      // setCityData(alldata?.data?.city);
      // setTotal(alldata?.data?.total);
    } else {
      return;
    }
  };
  // const sorting = (originData,)
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
        totalPrice
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
