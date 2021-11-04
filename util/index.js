//fetchall
const fetchData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default fetchData;

export const loadItem = (itemName) => {
  try {
    const serializedItem = localStorage.getItem(itemName);
    if (serializedItem === null) {
      return undefined;
    }
    const itemData = JSON.parse(serializedItem);

    return itemData;
  } catch (err) {
    return undefined;
  }
};
// expired by hours
export const saveItem = (itemData, itemName) => {
  try {
    const serializedItem = JSON.stringify(itemData);
    localStorage.setItem(itemName, serializedItem);
  } catch (err) {
    // Igonre write error.
  }
};

export const removeItem = (itemName) => {
  try {
    localStorage.removeItem(itemName);
  } catch (err) {
    // Igonre write error.
  }
};
