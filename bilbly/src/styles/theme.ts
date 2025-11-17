// src/styles/theme.ts

export const theme = {
  colors: {
    userRose: '#F6C5CF', 
    userLime: '#F2F4C6',
    userBlue: '#C5DDF3', 
    userGreen: '#CDF1CD', 
    userViolet: '#D5C2F0',
    userMint: '#CBEFED',
    userPink: '#FBD7EE',
    userBrown: '#E6D5C9',

    textPrimary: '#333333', 
    textWhite: '#FFFFFF',
    textViolet: '#422072',
    textRose: '#970522',
    textBlue: '#074D8F',
    textGreen: '#347333',
    textMint: '#30706C',
    textPink: '#7E1853',
    textBrown: '#6E3C16',
    textLime: '#888F00',
  },
};

// 테마의 타입을 추출해서 내보냅니다 (TypeScript용)
export type ThemeType = typeof theme;