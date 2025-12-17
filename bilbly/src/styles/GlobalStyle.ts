import { createGlobalStyle } from 'styled-components';
import GimpoBatangFont from '../assets/fonts/GimpoBatang.ttf';


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GimpoBatang';
    src: url(${GimpoBatangFont}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, 
                  system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", 
                  "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", 
                  "Segoe UI Symbol", sans-serif;
    
    background-color: #FFFCF8; 
    
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

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



export const theme = {
  colors: {
    userRose: '#F6C5CF', 
    userLime: '#F2F4C6',
    userBlue: '#C5DDF3', 
    userGreen: '#CDF1CD', 
    userViolet: '#D5C2F0',
    userMint: '#CBEFED',
    userPink: '#FBD7EE',
    userOrange: '#E6D5C9',

    textPrimary: '#333333', 
    textWhite: '#FFFFFF',
    textViolet: '#422072',
    textRose: '#970522',
    textBlue: '#074D8F',
    textGreen: '#347333',
    textMint: '#30706C',
    textPink: '#7E1853',
    textOrange: '#6E3C16',
    textLime: '#888F00',
  },
};

export default GlobalStyle;