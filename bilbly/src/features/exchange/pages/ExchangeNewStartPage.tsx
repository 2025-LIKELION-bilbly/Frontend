import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangeNewStartPage.styles'; 
import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg';

function ExchangeNewStartPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/main');
  };

  const handleSelectBook = () => {
    // 책 고르는 페이지로 이동 (예: 책장, 검색 등)
    console.log("책 고르러 가기");
    // navigate('/bookshelf'); // 필요시 주석 해제
  };

  return (
    <S.Container>

      <S.TitleSection>
        <S.MainTitle>
          새로 시작할<br />
          책을 골라주세요
        </S.MainTitle>
        <S.SubTitle>
          3일 안으로 책을 고르지 않으면<br />
          랜덤으로 책이 배정돼요
        </S.SubTitle>
      </S.TitleSection>

      <S.BookGrid>
        <S.BookWrapper>
          <S.BookImage src={BookCover1} alt="Book 1" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        <S.BookWrapper>
          <S.BookImage src={BookCover2} alt="Book 2" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        <S.BookWrapper>
          <S.BookImage src={BookCover1} alt="Book 3" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
      </S.BookGrid>

      <S.ButtonGroup>
        {/* 홈으로 버튼 */}
        <S.Button onClick={handleGoHome}>
          홈으로
        </S.Button>
        
        {/* 주황색 책 고르기 버튼 */}
        <S.Button $primary onClick={handleSelectBook}>
          책 고르기
        </S.Button>
      </S.ButtonGroup>

    </S.Container>
  );
}

export default ExchangeNewStartPage;