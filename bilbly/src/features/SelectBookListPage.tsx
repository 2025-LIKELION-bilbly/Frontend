// 책 고르기 -> 책 리스트 예시 파일// Step4ColorPage.tsx
// ✨ 임시로 SelectBookIntroPage와 동일하게 세팅함 (추후에 수정 예정)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./meeting/pages/meeting-create-page/SelectBookIntroPage.styles";
import NextBtnTwo from "../components/NextBtnTwo";

const IntroPage = () => {
    const navigate = useNavigate();

    const handleLater = () => {
        navigate("/home"); // 나중에 고르기 -> main 페이지로 이동
    };

    const handleSelectBook = () => {
        navigate("/selectbookpage"); // 책 고르기 -> 책 리스트 페이지로 이동
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
