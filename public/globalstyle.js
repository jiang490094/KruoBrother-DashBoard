import { createGlobalStyle } from "styled-components";

import { resetStyle } from "./resetStyle";

const GlobalStyles = createGlobalStyle`
  ${resetStyle}

    body {
    font-family: PingFangTC, Arial, Helvetica, Microsoft JhengHei;
  }
  html{
    height: -webkit-fill-available;
    scroll-behavior: smooth;
  }
  .dead-line{
    position: absolute;
    top:11px;
    right: 16px;
  }
`;
export default GlobalStyles;
