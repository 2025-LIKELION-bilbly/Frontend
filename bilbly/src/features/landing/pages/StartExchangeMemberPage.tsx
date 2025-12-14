import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LandingPage.styles'; // 스타일 재사용

import Header from '../../../components/Header'; 
import MeetingSelector from '../../home/pages/MeetingSelector';
import CategoryTabs from '../../home/pages/CategoryTabs';

import BookCover1 from '../../../assets/book_cover_1.jpg';
// BookCover2는 사용 안 하고 Placeholder로 대체 (사진 참고)

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M0.5 0.5L8 8L0.5 15.5" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function StartExchangeMemberPage() {
  const navigate = useNavigate();

  // 내가 책을 골랐는지 여부 (false: 안 고름 / true: 고름)
  // 지금은 화면 확인을 위해 false로 둡니다. 
  const [hasSelectedBook, setHasSelectedBook] = useState(false); 

  // 책 고르러 가는 페이지로 이동
  const handleGoToSelectBook = () => {
    // 임시 경로 (책 선택 페이지)
    navigate('/meeting/join/1/selectbooklist'); 
  };

  // 새로운 모임 생성/참여하기
  const handleCreateMeeting = () => {
    navigate('/meeting/create/step');
  };

  return (
    <S.Container>
      <Header />
      <MeetingSelector />
      <CategoryTabs />
      
      
      {/* 책 이미지 영역 */}
      <S.BookImageContainer>
        {/* 1. 다른 멤버 (책 고름) */}
        <S.BookWrapper>
          <S.BookImage src={BookCover1} alt="Book 1" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        {/* 2. 나 (아직 안 고름 - 가운데) */}
        <S.BookWrapper>
          <S.BookPlaceholder>
            책<br/>고르는 중
          </S.BookPlaceholder>
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
        
        {/* 3. 다른 멤버 (아직 안 고름) */}
        <S.BookWrapper>
          <S.BookPlaceholder>
            책<br/>고르는 중
          </S.BookPlaceholder>
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
      </S.BookImageContainer>
      

      {/* 상태에 따라 하단 내용 변경 */}
      {hasSelectedBook ? (
        // 책을 이미 고른 경우
        <S.BottomSection>
          <S.SectionTitle>
            기다리는 동안<br />
            새로운 모임은 어떠세요?
          </S.SectionTitle>
          <S.ActionBtn $isLast onClick={handleCreateMeeting}>
            새로운 모임 생성/참여하기
            <ArrowIcon />
          </S.ActionBtn>
        </S.BottomSection>
      ) : (
        // 책을 안 고른 경우
        <S.BottomSection>
          <S.SectionTitle>
            교환할 책을 골라보세요
          </S.SectionTitle>
          <S.BottomSubTitle>
            시작 전까지 책을 고르지 않으면 랜덤으로 결정돼요
          </S.BottomSubTitle>
          
          <S.ActionBtn $isLast onClick={handleGoToSelectBook}>
            책 고르러 가기
            <ArrowIcon />
          </S.ActionBtn>
        </S.BottomSection>
      )}

    </S.Container>
  );
}

export default StartExchangeMemberPage;