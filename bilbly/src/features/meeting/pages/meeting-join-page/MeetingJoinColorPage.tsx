import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { useState } from "react";
import * as S from "./MeetingJoinColorPage.styles";
import * as G from "../../../../styles/GlobalStyle";
import ColorSelectBox from "../../components/ColorSelectBox";
import NextBtn from "../../components/NextBtn";
import UsedColorToast from "../../components/meeting-join/UsedColorToast";

type Member = {
    nickname: string;
    color: keyof typeof G.theme.colors;
};

interface LocationState {
    members: Member[];
    meetingName: string;
    nickname: string;
}

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

const MeetingJoinColor = () => {
    const { code } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const location = useLocation();
    const { members = [], meetingName, nickname } =
        (location.state as LocationState) || {};

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false); // 이미 선택된 색상 선택시 토스트 띄우기

    // 이미 사용된 색 (예: "userRose" → "rose")
    const usedColors = members.map(m =>
        m.color.replace("user", "").toLowerCase()
    );


    const handleSelect = (label: string) => {
        if (usedColors.includes(label)) {
            setShowToast(true);
            return;
        }
        setSelectedColor(prev => (prev === label ? null : label));
    };

    const handleNext = () => {
        if (!selectedColor) return;

        console.log("선택된 색상 출력: ", selectedColor) // 확인용 colsole
    
        navigate(`/meeting/join/${code}/selectbookshow`, {
            state: {
                members,
                meetingName,
                nickname,
                selectedColor
            }
        });
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>3/3</S.StepText>
                    <S.Title>사용할 색을 설정해 주세요</S.Title>
                    <S.SubTitle>
                        글씨, 메모, 프로필 색으로 사용돼요
                        <br />
                        한 번 설정하면 바꿀 수 없어요
                    </S.SubTitle>
                </S.MainBox1>

                <S.ColorGrid>
                    {COLOR_OPTIONS.map(opt => {
                        const isUsed = usedColors.includes(opt.label);

                        return (
                            <ColorSelectBox
                                key={opt.label}
                                label={opt.label}
                                color={theme.colors[opt.bgKey]}
                                textColor={theme.colors[opt.textKey]}
                                selected={selectedColor === opt.label}
                                isUsed={isUsed}
                                onClick={() => handleSelect(opt.label)}
                            />
                        );
                    })}
                </S.ColorGrid>
            </S.MainContainer>


            {/* 이미 선택된 색상을 눌렀을 때 토스트 띄우기 */}
            {showToast && (
                <UsedColorToast
                    duration={1500}
                    onClose={() => setShowToast(false)}
                />
            )}

            <S.BottomArea>
                <NextBtn
                    label="완료"
                    state={selectedColor ? "valid" : "default"}
                    onClick={handleNext}
                />
            </S.BottomArea>
        </S.Container>
    );
};

export default MeetingJoinColor;
