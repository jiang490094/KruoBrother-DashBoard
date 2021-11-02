import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext({});

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
  return (
    <GlobalContext.Provider value={{ heartBeat }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Globalprovider;
Globalprovider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
};
