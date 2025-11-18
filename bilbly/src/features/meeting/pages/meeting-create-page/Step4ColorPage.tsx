import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Step4ColorPage.styles";
import NextBtn from "../../components/NextBtn";
import ColorSelectBox from "../../components/meeting-create/ColorSelectBox";

const COLORS = [
    { label: "로즈", value: "#EAB3B6" },
    { label: "라임", value: "#F4F5CC" },
    { label: "블루", value: "#C8DCF2" },
    { label: "그린", value: "#C6EBC5" },
    { label: "브라운", value: "#D7C4B2" },
    { label: "민트", value: "#CDE7E5" },
    { label: "핑크", value: "#F5D0E7" },
    { label: "바이올렛", value: "#CDB7F6" },
];

const Step4ColorPage = () => {
    const navigate = useNavigate();

    // 선택된 색상 1개 (또는 null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // 선택한 상태인지 체크
    const hasSelected = selectedColor !== null;

    // 색상 선택 / 해제 처리
    const handleSelect = (color: string) => {
        if (selectedColor === color) {
            setSelectedColor(null); // 다시 누르면 해제 → 모든 아이콘 사라짐
        } else {
            setSelectedColor(color); // 새로운 색 선택
        }
    };

    // Next 버튼 상태
    const buttonState = hasSelected ? "valid" : "default";

    const handleNext = () => {
        if (!hasSelected) return;
        navigate("/meeting/create/complete");
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.StepText>4/4</S.StepText>

                <S.Title>사용할 색을 설정해 주세요</S.Title>
                <S.SubTitle>
                    글씨, 메모, 프로필 색으로 사용돼요
                    <br />
                    한 번 설정하면 바꿀 수 없어요
                </S.SubTitle>

                <S.ColorGrid>
                    {COLORS.map((color) => (
                        <ColorSelectBox
                            key={color.label}
                            label={color.label}
                            color={color.value}
                            selected={selectedColor === color.label}
                            hasSelected={hasSelected}   // 선택된 항목 존재 여부 전달
                            onClick={() => handleSelect(color.label)}
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
