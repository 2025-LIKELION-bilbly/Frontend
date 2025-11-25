// Step4ColorPage.tsx
import { useNavigate } from "react-router-dom";
import * as S from "./SelectBookIntroPage.styles";
import NextBtnTwo from "../../components/NextBtnTwo";

const IntroPage = () => {
    const navigate = useNavigate();

    const handleLater = () => {
        // navigate("/main"); // 나중에 고르기 -> main 페이지로 이동
        navigate("/meeting/join/1"); // 추후 수정: 나중에 고르기 -> 데모에서 코드가 일치할 때 넘어가는 거 확인하는 용도
    };

    const handleSelectBook = () => {
        navigate("/selectbooklist"); // 책 고르기 -> 책 리스트 페이지로 이동
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.BookOpenIcon />

                    <S.Title>책을 골라보세요</S.Title>
                    <S.SubTitle>
                        각자 고른 책을
                        <br />
                        n일 마다 교환해요
                    </S.SubTitle>
                </S.MainBox1>
            </S.MainContainer>

            {/* 🔥 여기 NextBtnTwo 사용! */}
            <S.BottomArea>
                <NextBtnTwo
                    leftLabel="나중에"
                    rightLabel="책고르기"
                    onLeftClick={handleLater}
                    onRightClick={handleSelectBook}
                />
            </S.BottomArea>
        </S.Container>
    );
};

export default IntroPage;
