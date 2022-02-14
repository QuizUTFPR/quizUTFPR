import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* media quieries para responsividade baseada no font-size */
  html {
    @media ( max-width: 1080px) {
        font-size: 93.75%; /* 15px */
    }
    @media ( max-width: 720px) {
        font-size: 87.5%; /* 14px */
    }
    @media ( max-width: 480px) {
        font-size: 81.25%; /* 13px */
    }
    @media ( max-width: 300px) {
        font-size: 62.5%; /* 10px */
    }
  }

  #root,
  body,
  html{
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    font-family: 'Inter', sans-serif;
    background: ${({ theme }) => theme.palette.background.bgWebSite};
    -webkit-font-smoothing: antialiased;
  }


  /* SCROLLBAR */
    /* width */
    ::-webkit-scrollbar {
      width: 8px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 16px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
`;
