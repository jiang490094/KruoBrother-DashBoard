import styled from "styled-components";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../view/map"));

function HomePage({ className }) {
  return (
    <div className={className}>
      <Map />
    </div>
  );
}

export default styled(HomePage)`
  background-color: black;
  color: red;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
