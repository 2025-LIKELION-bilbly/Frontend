import { theme } from "../styles/GlobalStyle"; 

export const COLOR_OPTIONS = [
    { label: "rose", bgKey: "userRose", textKey: "textRose" },
    { label: "lime", bgKey: "userLime", textKey: "textLime" },
    { label: "blue", bgKey: "userBlue", textKey: "textBlue" },
    { label: "green", bgKey: "userGreen", textKey: "textGreen" },
    { label: "brown", bgKey: "userBrown", textKey: "textBrown" },
    { label: "mint", bgKey: "userMint", textKey: "textMint" },
    { label: "pink", bgKey: "userPink", textKey: "textPink" },
    { label: "violet", bgKey: "userViolet", textKey: "textViolet" },
] as const;

export const getTextColorFromBg = (bgKey: string) => {
    const found = COLOR_OPTIONS.find((opt) => opt.bgKey === bgKey);

    if (!found) return theme.colors.textPrimary; // fallback

    return theme.colors[found.textKey];
};

export type BgKey = typeof COLOR_OPTIONS[number]["bgKey"];

export const getBgColor = (bgKey: BgKey) => theme.colors[bgKey];

export const BGKEY_TO_BACKEND: Record<BgKey, string> = {
    userRose: "RED",
    userBlue: "BLUE",
    userGreen: "GREEN",
    userLime: "YELLOW",
    userViolet: "PURPLE",
    userBrown: "ORANGE",
    userPink: "PINK",
    userMint: "CYAN",
};

export const toBackendColor = (bgKey: BgKey) => BGKEY_TO_BACKEND[bgKey];
