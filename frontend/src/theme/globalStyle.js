import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  #root,
  body,
  html{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    background: ${({theme}) => theme.palette.background.bgWebSite};
  }
`;
