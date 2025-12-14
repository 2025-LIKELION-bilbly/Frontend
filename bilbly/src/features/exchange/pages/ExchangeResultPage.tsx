import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangeResultPage.styles';

// 예시 이미지
import BookCover1 from '../../../assets/book_cover_1.jpg';

function ExchangeResultPage() {
  const navigate = useNavigate();

  // 데이터 (임시)
  const bookTitle = "책 제목이 들어가는 자리";
  const authorName = "작가 이름";
  const genre = "판타지";
  const pageCount = "324";
  
  // 상세 데이터
  const publishDate = "2024.03.15";
  const publisher = "출판사 이름";
  const isbn = "979-11-1234-567-8";
  
  const summary = `책의 줄거리가 들어가는 영역입니다.책의 줄거리가 들어가는 영역입니다.책의 줄거리가 들어가는 영역입니다.책의 줄거리가 들어가는 영역입니다.책의 줄거리가 들어가는 영역입니다. `;

  // 홈으로 이동
  const handleGoHome = () => {
    navigate('/main');
  };

  // 바로 읽기 이동
  const handleReadNow = () => {
    navigate('/reading/1/1'); // 실제 책 ID로 수정 필요
  };

  return (
    <S.Container>
      <S.Title>이번에 읽을 책이예요</S.Title>

      <S.BookSection>
        {/* 책 표지 */}
        <S.LargeBookImage src={BookCover1} alt="교환된 책 표지" />
        
        <S.BookTextInfo>
          {/* 책 제목 */}
          <S.BookTitle>{bookTitle}</S.BookTitle>

          {/* 저자 | 장르 | 페이지수 그리드 */}
          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>저자</S.InfoLabel>
              <S.InfoValue>{authorName}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>장르</S.InfoLabel>
              <S.InfoValue>{genre}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>페이지수</S.InfoLabel>
              <S.InfoValue>{pageCount}</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>

          {/* 상세 정보 (발행일, 출판사, ISBN) */}
          <S.DetailInfo>
            <S.DetailText>
              발행일 <S.DetailValue>{publishDate}</S.DetailValue>
            </S.DetailText>
            <S.DetailText>
              출판사 <S.DetailValue>{publisher}</S.DetailValue>
            </S.DetailText>
            <S.DetailText>
              ISBN <S.DetailValue>{isbn}</S.DetailValue>
            </S.DetailText>
          </S.DetailInfo>

          {/* 줄거리 */}
          <S.SummarySection>
            <S.SummaryText>{summary}</S.SummaryText>
          </S.SummarySection>

        </S.BookTextInfo>
      </S.BookSection>

      {/* 하단 버튼 2개 */}
      <S.ButtonGroup>
        <S.Button onClick={handleGoHome}>
          홈으로
        </S.Button>
        <S.Button $primary onClick={handleReadNow}>
          바로읽기
        </S.Button>
      </S.ButtonGroup>

    </S.Container>
  );
}

export default ExchangeResultPage;