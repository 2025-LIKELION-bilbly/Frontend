// Step4ColorPage.tsx
import { useTheme } from "styled-components";  // 🌈 전역 테마 사용
import * as S from "./MeetingCreateColorPage.styles";
import NextBtn from "../../../../components/NextBtn";
import ColorSelectBox from "../../components/ColorSelectBox";
import { COLOR_OPTIONS } from "../../../../styles/ColorUtils";
import type { BgKey } from "../../../../styles/ColorUtils";

type MeetingCreateColorProps = {
    color: BgKey | null;
    setColor: (v: BgKey) => void;
    onNext: () => void;
};


const MeetingCreateColor = ({ 
    color, 
    setColor, 
    onNext 
}: MeetingCreateColorProps) => {
    const theme = useTheme();

    

    const hasSelected = color !== null;
    const buttonState = hasSelected ? "valid" : "default";


    const handleNext = () => {
        if (!color) return;

        console.log("최종 선택된 색:", color); 
        onNext(); 
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
                        key={opt.bgKey}
                        bgColor={theme.colors[opt.bgKey]}
                        textColor={theme.colors[opt.textKey]}
                        label={opt.label}  
                        selected={color === opt.bgKey}
                        onClick={() => setColor(opt.bgKey)}
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

export default MeetingCreateColor;
