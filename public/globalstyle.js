import { createGlobalStyle } from "styled-components";

import { resetStyle } from "./resetStyle";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
  ${resetStyle}
  @font-face {
        font-family: "Prohibition";
        src: url("fonts/Prohibition-Lines.ttf?") format("truetype")
    }
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
