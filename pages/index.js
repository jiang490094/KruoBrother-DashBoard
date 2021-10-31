import styled from "styled-components";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

import Background from "../view/background";

const Map = dynamic(() => import("../view/map"));

function HomePage({ className }) {
  return (
    <div className={className}>
      <Map />
      <Background />
    </div>
  );
}

export default styled(HomePage)`
  color: red;
`;

HomePage.propTypes = {
  className: PropTypes.string.isRequired
};
