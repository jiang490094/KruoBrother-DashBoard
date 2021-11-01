import PropTypes from "prop-types";

import GlobalStyle from "../public/globalstyle";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
App.defaultProps = {
  pageProps: {}
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object
};
