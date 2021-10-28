import styled from "styled-components";
import PropTypes from "prop-types";

import TopProduct from "../components/TopProduct";

function HomePage({ className }) {
  return (
    <>
      <div className={className}>Welcome to alpha!</div>
      <TopProduct />
    </>
  );
}

export default styled(HomePage)`
  color: red;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
