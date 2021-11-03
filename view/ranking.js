import { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { GlobalContext } from "../provider/globalprovider";

const Ranking = ({ className }) => {
  const { rankDisplay } = useContext(GlobalContext);
  return (
    <div className={className}>
      {rankDisplay.map((item, key) => {
        return (
          <p key={key}>
            {item.item_name} ${item.amount}
          </p>
        );
      })}
    </div>
  );
};

export default styled(Ranking)`
  color: white;
  position: fixed;
  left: 0;
  z-index: 900;
  p {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

Ranking.propTypes = {
  className: PropTypes.string.isRequired
};
