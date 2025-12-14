import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './HomePage.styles'; 

import Header from '../../../components/Header'; 

// Home Components
import MeetingSelector from './MeetingSelector';
import CategoryTabs from './CategoryTabs';
import BookCarousel from './BookCarousel';
import BookmarkGraph from './BookmarkGraph';
import MoreMeetings from './MoreMeetings';

function HomePage() {
  const [currentBookId, setCurrentBookId] = useState<number>(1);

  const reviews = [
    { id: 1, content: "텍스트가 들어가는 자리 텍스트가 들어가는 자리", source: "모임.." },
    { id: 2, content: "생각보다 훨씬 재미있게 읽었습니다. 강추!", source: "모임.." },
    { id: 3, content: "작가의 문체가 돋보이는 작품이네요.", source: "모임.." },
  ];
  return (
    <S.Container>
      <Header />
      
      <MeetingSelector />
      <CategoryTabs />
      
      <BookCarousel onSlideChange={setCurrentBookId} />
      
      {currentBookId === 2 ? (
        <S.IntroContainer>
          <S.BookDetailContainer>
            <S.Divider />
            
            {/* 책 제목 */}
            <S.BookTitlePlaceholder>책 제목이 들어가는 자리</S.BookTitlePlaceholder>
            
            {/* 저자 및 장르 정보 (왼쪽 정렬) */}
            <S.BookMetaInfo>
              <S.MetaRow>
                <S.MetaLabel>저자</S.MetaLabel>
                <S.MetaValue>작가이름</S.MetaValue>
              </S.MetaRow>
              <S.MetaRow>
                <S.MetaLabel>장르</S.MetaLabel>
                <S.MetaValue>판타지</S.MetaValue>
              </S.MetaRow>
            </S.BookMetaInfo>
            
            {/* 줄거리 */}
            <S.BookSummaryPlaceholder>
              여기는 책의 줄거리나 주요 내용이 들어가는 자리입니다.<br />
              책을 선택하면 이 부분에 해당 책의 정보가 표시됩니다.<br />
              마음에 드는 책을 골라보세요.
            </S.BookSummaryPlaceholder>
            <S.SectionTitle>한줄평</S.SectionTitle>
            {reviews.map((review) => (
              <S.ReviewTable key={review.id}>
                {/* 1. 리뷰 내용 (왼쪽) */}
                <S.ReviewContentCell>
                  {review.content}
                </S.ReviewContentCell>
                
                {/* 2. 구분선 */}
                <S.VerticalLine />
                
                {/* 3. 모임.. (오른쪽) */}
                <S.ReviewInfoCell>
                  {review.source}
                </S.ReviewInfoCell>
              </S.ReviewTable>
            ))}
          </S.BookDetailContainer>
        </S.IntroContainer>
      ) : (
        <>
          <S.Divider />
          <BookmarkGraph />
          <MoreMeetings />
        </>
      )}
      
    </S.Container>
  );
}

export default HomePage;