import { createGlobalStyle } from "styled-components";

import { resetStyle } from "./resetStyle";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  ${resetStyle}
    body {
    font-family: PingFangTC, Arial, Helvetica, Microsoft JhengHei;
  }
  html{
    height: -webkit-fill-available;
    scroll-behavior: smooth;
  }
`;
export default GlobalStyles;
