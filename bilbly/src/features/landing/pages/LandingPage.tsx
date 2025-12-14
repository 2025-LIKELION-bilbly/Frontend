import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import * as S from './LandingPage.styles';

import Header from '../../../components/Header'; 
import MeetingSelector from '../../home/pages/MeetingSelector';
import CategoryTabs from '../../home/pages/CategoryTabs';

import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M0.5 0.5L8 8L0.5 15.5" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function LandingPage() {
  const navigate = useNavigate();

  // 교환독서 시작하기 버튼 핸들러
  const handleStartExchange = () => {
    navigate('/exchange/start');
   
  };

  // 모임 생성 페이지로 이동
  const handleCreateMeeting = () => {
    navigate('/meeting/create/step');
  };

  return (
    <S.Container>
      <Header />
      <MeetingSelector />
      <CategoryTabs />
      
      
      <S.BookImageContainer>
        <S.BookWrapper>
          <S.BookImage src={BookCover1} alt="Book 1" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>

        <S.BookWrapper>
          <S.BookImage src={BookCover2} alt="Book 2" />
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
        
        <S.BookWrapper>
          <S.BookPlaceholder>
            책<br/>고르는 중
          </S.BookPlaceholder>
          <S.Nickname>닉네임</S.Nickname>
        </S.BookWrapper>
      </S.BookImageContainer>
      

      {/* 1. 교환독서 섹션 */}
      <S.BottomSection>
        <S.SectionTitle>교환독서를 시작할까요?</S.SectionTitle>
        <S.ActionBtn onClick={handleStartExchange}>
          교환독서 시작하기
          <ArrowIcon />
        </S.ActionBtn>
      </S.BottomSection>

      {/* 2. 새로운 모임 섹션 */}
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

    </S.Container>
  );
}

export default LandingPage;