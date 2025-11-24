import { theme } from "../styles/GlobalStyle"; // 경로는 프로젝트에 맞게 수정

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

// bgKey로 textKey를 자동 찾는 함수
export const getTextColorFromBg = (bgKey: string) => {
    const option = COLOR_OPTIONS.find((opt) => opt.bgKey === bgKey);
    if (!option) return theme.colors.textPrimary; // fallback
    return theme.colors[option.textKey];
};
