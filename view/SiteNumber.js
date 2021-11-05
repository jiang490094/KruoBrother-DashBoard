import PropTypes from "prop-types";
import styled from "styled-components";
import { useContext } from "react";

import { GlobalContext } from "../provider/globalprovider";

import SiteCoutUp from "./SiteCoutUp";

const SiteNumber = ({ className }) => {
  const { total } = useContext(GlobalContext);

  return (
    <div className={className}>
      <img src="Images/dot-line.png" />
      <div className="site-number">
        <div className="buy123">
          <div>
            <div className="title">Total</div>
            <div className="site-line">生活市集</div>
          </div>
          <SiteCoutUp price={total?.buy123?.amount} site="buy123" />
        </div>
        <img className="under-line" src="/Images/pie-under-line.png" />
        <div className="buy123 pcone">
          <div>
            <div className="title">Total</div>
            <div className="site-line">松果購物</div>
          </div>
          <SiteCoutUp price={total?.pcone?.amount} site="pcone" />
        </div>
      </div>
      <img src="Images/dot-line.png" />
    </div>
  );
};

SiteNumber.propTypes = {
  className: PropTypes.string.isRequired
};

export default styled(SiteNumber)`
  color: white;
  width: 500px;
  position: fixed;
  right: 26px;
  bottom: 30px;
  font-family: Prohibition;
  img {
    display: block;
  }
  .site-number {
    .under-line {
      width: 500px;
    }

    .buy123 {
      display: flex;
      font-size: 30px;
      padding: 12px;
      background-color: #44474c6b;
      align-items: flex-end;
      p {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 4px;
      }
      .total-number {
        font-size: 45px;
        margin-left: 18px;
      }
    }

    .pcone {
      padding: 0 0 12px 12px;
    }

    .style-line::before {
    }
    .title {
      font-size: 16px;
    }
  }
`;
