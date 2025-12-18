// Step4ColorPage.tsx
import { useNavigate } from "react-router-dom";
import * as S from "./SelectBookIntroPage.styles";
import NextBtnTwo from "../../../../components/NextBtnTwo";


type IntroPageProps = {
    readingPeriod: number;
}

const IntroPage = ({ readingPeriod }: IntroPageProps) => {
    const navigate = useNavigate();

    const handleLater = () => {
        navigate("/main"); 
    };

    const handleSelectBook = () => {
        navigate("/select-book"); // 책 고르기 -> 책 리스트 페이지로 이동
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
                        {readingPeriod}일 마다 교환해요
                    </S.SubTitle>
                </S.MainBox1>
            </S.MainContainer>

            
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
