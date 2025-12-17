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
    Strokeprimary: '#100F0F',

    rose100: '#F6C5CF',
    rose200: '#F29FB0',
    rose300: '#EF7890',
    rose400: '#EE506F',
    rose800: '#970522',

    lime100: '#F2F4C6',
    lime200: '#EBEFA2',
    lime300: '#E6EB7C',
    lime400: '#E1E954',

    blue100: '#C5DDF3',
    blue200: '#9EC7ED',
    blue300: '#75B1E9',
    blue400: '#4C9BE5',

    violet100: '#D5C2F0',
    violet200: '#C1A4E9',
    violet300: '#A57BDF',
    violet400: '#9361D9',

    mint100: '#CBEFED',
    mint200: '#B2E7E4',
    mint300: '#8EDCD7',
    mint400: '#79D5D0',

    pink100: '#FBD7EE',
    pink200: '#F9C3E5',
    pink300: '#F6A8D9',
    pink400: '#F597D2',

    brown100: '#E6D5C9',
    brown200: '#D7B9A1',
    brown400: '#BE7F4F',

    green100: '#CDF1CD',
    green200: '#B5EAB4',
    green300: '#93E092',
    green400: '#7EDA7D',

    UserPointblue: '#2285E3',
    UserPointbrown: '#A06437',
    UserPointgreen: '#5ED15D',
    UserPointlime: '#DFE82B',
    UserPointmint: '#57CBC4',
    UserPointpink: '#F27DC7',
    UserPointrose: '#ED264E',
    UserPointviolet: '#783ACF',
    UserPointwithdrawn: '#595959',
  },
};

// 테마의 타입을 추출해서 내보냅니다 (TypeScript용)
export type ThemeType = typeof theme;