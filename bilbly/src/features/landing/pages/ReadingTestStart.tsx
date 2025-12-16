import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './StartExchangePage.styles'; 

// 이미지 불러오기 (기존과 동일)
import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg';

function ReadingTestStart() {
  const navigate = useNavigate();

  // 홈으로 이동 함수
  const handleGoHome = () => {
    navigate('/main');
  };

  // 바로 읽기 페이지로 이동 함수, 아직 구현 x
  const handleReadNow = () => {
    // 실제 책 ID와 페이지 번호로 이동 (예시: 1번 책, 1페이지)
    navigate('/reading/1/1');
  };

  return (
    <S.Container>

      <S.TitleSection>
        <S.MainTitle>
          교환 독서 시작
        </S.MainTitle>
        <S.SubTitle>
          nn일 후에 <br></br>책을 교환해요
        </S.SubTitle>
      </S.TitleSection>

      {/* 책 리스트 그리드 (StartPage와 동일한 구조) */}
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

      {/* 하단 버튼 그룹 */}
      <S.ButtonGroup>
        {/* 흰색 버튼: 홈으로 ($primary 속성 없음) */}
        <S.Button onClick={handleGoHome}>
          홈으로
        </S.Button>
        
        {/* 주황색 버튼: 바로읽기 ($primary 속성 있음) */}
        <S.Button $primary onClick={handleReadNow}>
          바로읽기
        </S.Button>
      </S.ButtonGroup>

    </S.Container>
  );
}

export default ReadingTestStart;