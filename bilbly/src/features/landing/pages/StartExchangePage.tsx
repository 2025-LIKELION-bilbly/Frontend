import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './StartExchangePage.styles';


// 이미지 재사용
import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg';

function StartExchangePage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleStart = () => {
    console.log("교환독서 시작!");
    navigate('/main'); 
  };

  return (
    <S.Container>

      <S.TitleSection>
        <S.MainTitle>
          아직 책을 고르지 않은<br />
          모임원이 있어요
        </S.MainTitle>
        <S.SubTitle>
          책을 고르지 못한 모임원은<br />
          랜덤으로 책이 결정돼요
        </S.SubTitle>
      </S.TitleSection>

      <S.BookGrid>
        {/* 책 1 */}
        <S.BookWrapper>
          <S.BookImage src={BookCover1} alt="Book 1" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        {/* 책 2 */}
        <S.BookWrapper>
          <S.BookImage src={BookCover2} alt="Book 2" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        {/* 책 안 고른 사람 (Placeholder) */}
        <S.BookWrapper>
          <S.BookPlaceholder>
            책<br/>고르는 중
          </S.BookPlaceholder>
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
      </S.BookGrid>

      {/* 하단 버튼 */}
      <S.ButtonGroup>
        <S.Button onClick={handleBack}>뒤로가기</S.Button>
        <S.Button $primary onClick={handleStart}>시작하기</S.Button>
      </S.ButtonGroup>

    </S.Container>
  );
}

export default StartExchangePage;