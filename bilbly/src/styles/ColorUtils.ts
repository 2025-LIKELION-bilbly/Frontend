import { theme } from "../styles/GlobalStyle"; 


export const COLOR_OPTIONS = [
    { label: "rose", bgKey: "userRose", textKey: "textRose" },
    { label: "lime", bgKey: "userLime", textKey: "textLime" },
    { label: "blue", bgKey: "userBlue", textKey: "textBlue" },
    { label: "green", bgKey: "userGreen", textKey: "textGreen" },
    { label: "brown", bgKey: "userOrange", textKey: "textOrange" },
    { label: "mint", bgKey: "userMint", textKey: "textMint" },
    { label: "pink", bgKey: "userPink", textKey: "textPink" },
    { label: "violet", bgKey: "userViolet", textKey: "textViolet" },
] as const;


export type BgKey =
  | "userRose"
  | "userLime"
  | "userBlue"
  | "userGreen"
  | "userOrange"
  | "userMint"
  | "userPink"
  | "userViolet";

export type BackendColor =
  | "RED"
  | "BLUE"
  | "GREEN"
  | "YELLOW"
  | "PURPLE"
  | "ORANGE"
  | "PINK"
  | "CYAN";

export const getTextColorFromBg = (bgKey: string) => {
    const found = COLOR_OPTIONS.find((opt) => opt.bgKey === bgKey);

    if (!found) return theme.colors.textPrimary; // fallback

    return theme.colors[found.textKey];
};


// 프엔 -> 백
export const COLOR_TO_BACKEND: Record<BgKey, BackendColor> = {
  userRose: "RED",
  userLime: "YELLOW",
  userBlue: "BLUE",
  userGreen: "GREEN",
  userOrange: "ORANGE",
  userMint: "CYAN",
  userPink: "PINK",
  userViolet: "PURPLE",
};

export const toBackendColor = (bgKey: BgKey): BackendColor =>
  COLOR_TO_BACKEND[bgKey];

export const getBgColor = (bgKey: BgKey) => {
  return theme.colors[bgKey];
};


// 백 -> 프엔
export const BACKEND_TO_BG: Record<BackendColor, BgKey> = {
  RED: "userRose",
  YELLOW: "userLime",
  BLUE: "userBlue",
  GREEN: "userGreen",
  ORANGE: "userOrange",
  CYAN: "userMint",
  PINK: "userPink",
  PURPLE: "userViolet",
};

export const backendToBgKey = (color: BackendColor): BgKey =>
  BACKEND_TO_BG[color];
