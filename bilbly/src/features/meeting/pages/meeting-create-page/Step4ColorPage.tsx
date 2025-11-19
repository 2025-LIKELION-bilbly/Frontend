// Step4ColorPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";  // 🌈 전역 테마 사용
import * as S from "./Step4ColorPage.styles";
import NextBtn from "../../components/NextBtn";
import ColorSelectBox from "../../components/meeting-create/ColorSelectBox";

const COLOR_OPTIONS = [
    { label: "rose", bgKey: "userRose", textKey: "textRose" },
    { label: "lime", bgKey: "userLime", textKey: "textLime" },
    { label: "blue", bgKey: "userBlue", textKey: "textBlue" },
    { label: "green", bgKey: "userGreen", textKey: "textGreen" },
    { label: "brown", bgKey: "userBrown", textKey: "textBrown" },
    { label: "mint", bgKey: "userMint", textKey: "textMint" },
    { label: "pink", bgKey: "userPink", textKey: "textPink" },
    { label: "violet", bgKey: "userViolet", textKey: "textViolet" },
] as const;

const Step4ColorPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const hasSelected = selectedColor !== null;

    const handleSelect = (label: string) => {
        setSelectedColor(prev => (prev === label ? null : label));
    };

    const buttonState = hasSelected ? "valid" : "default";

    const handleNext = () => {
        if (!hasSelected) return;
        navigate("/meeting/create/code");
    };

    return (
        <S.Container>
        <S.MainContainer>
            <S.MainBox1>
            <S.StepText>4/4</S.StepText>

            <S.Title>사용할 색을 설정해 주세요</S.Title>
            <S.SubTitle>
                글씨, 메모, 프로필 색으로 사용돼요
                <br />
                한 번 설정하면 바꿀 수 없어요
            </S.SubTitle>
            </S.MainBox1>

            <S.ColorGrid>
            {COLOR_OPTIONS.map((opt) => (
                <ColorSelectBox
                key={opt.label}
                label={opt.label}
                color={theme.colors[opt.bgKey]}      // theme에서 배경 색 가져오기
                textColor={theme.colors[opt.textKey]} // theme에서 글자 색 가져오기
                selected={selectedColor === opt.label}
                hasSelected={hasSelected}
                onClick={() => handleSelect(opt.label)}
                />
            ))}
            </S.ColorGrid>
        </S.MainContainer>

        <S.BottomArea>
            <NextBtn label="완료" state={buttonState} onClick={handleNext} />
        </S.BottomArea>
        </S.Container>
    );
};

export default Step4ColorPage;
