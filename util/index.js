//fetchall
const fetchData = () => {
  return fetch(
    "https://alansun-kuo-24hr.dev.kuobrothers.com/api/tvdata/get_revenue_by_day "
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default fetchData;
