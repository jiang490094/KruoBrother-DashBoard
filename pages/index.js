import styled from "styled-components";
import PropTypes from "prop-types";

function HomePage({ className }) {
  return <div className={className}>Welcome to alpha!</div>;
}

export default styled(HomePage)`
  color: red;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
