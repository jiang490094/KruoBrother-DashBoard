import { createGlobalStyle } from "styled-components";

import { resetStyle } from "./resetStyle";

export default createGlobalStyle`
    ${resetStyle}
    body {
    font-family: PingFangTC, Arial, Helvetica, Microsoft JhengHei;
  }
  html{
    height: -webkit-fill-available;
    scroll-behavior: smooth;
  }
`;
