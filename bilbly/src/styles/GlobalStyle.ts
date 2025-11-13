// bilbly/src/styles/GlobalStyle.ts

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    /* 바깥 배경은 피그마의 기본색으로 설정 (패턴 없음) */
    background-color: #FFFCF8; 
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* 앱(S.Container)을 화면 중앙에 정렬시킴 */
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;