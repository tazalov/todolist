import { createGlobalStyle } from "styled-components";
import { F } from "../components/styled/Fragments.styled";
import backg from "../assets/img/bg.webp";

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
  }
  :focus,
  :active {
    outline: none;
  }
  a:focus,
  a:active {
    outline: none;
  }
  
  body {
    min-height: 100vh;
    line-height: 1;
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Arial', sans-serif;
    font-size: 16px;
    color: ${(props) => props.theme.colors.primaryFont};
    background: white url(${backg}) center center repeat;
    ${F.ScrollBody};
  }
  body::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5); // Adjust the alpha value as needed
      z-index: -1;
  }
  input,
  button,
  textarea {
    font-size: inherit;
    color: ${(props) => props.theme.colors.primaryFont};
  }
  button {
    cursor: pointer;
    color: inherit;
    background-color: inherit;
  }
  a {
    color: inherit;
  }
  a:link,
  a:visited {
    text-decoration: none;
  }
  a:hover {
    text-decoration: none
  }
  ul li {
    list-style: none;
  }
  img {
    vertical-align: top;
  }
  h1,
  h2  h3,
  h4,
  h5,
  h6 {
    font-weight: inherit;
    font-size: inherit;
  }
`;
