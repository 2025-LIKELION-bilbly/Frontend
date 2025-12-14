// src/features/home/components/BookmarkGraph.tsx

import React from 'react';
import * as S from './BookmarkGraph.styles';
import BookCover1 from '../../../assets/book_cover_1.jpg';
import { theme } from '../../../styles/theme';
// 그래프 데이터
const bookmarkData = [
  { id: 1, label: 15, color: theme.colors.rose100 }, // 짧은 것
  { id: 2, label: 25, color: theme.colors.rose200 }, // 긴 것
  { id: 3, label: 51, color: theme.colors.rose300 }, // 짧은 것
  { id: 4, label: 85, color: theme.colors.rose400 }, // 긴 것
  { id: 5, label: 40, color: theme.colors.rose100 }, // 짧은 것
];

function BookmarkGraph() {
  return (
    <S.Container>
      <S.Title>나의 북마크 <span className="unit">(%)</span></S.Title>
      
      <S.GraphWrapper>
        {/* 1. 막대 그래프 영역 */}
        <S.BarContainer>
          {bookmarkData.map((data, index) => {
          
            const alternatingHeight = index % 2 === 0 ? 72 : 45; 
            
            return (
              <S.BarColumn key={data.id} $index={index}>
                {/* Bar에 계산된 높이(alternatingHeight) 전달 */}
                <S.Bar height={alternatingHeight} color={data.color}>
                   {/* BottomLabel: 사용자 코드대로 유지 */}
                  <S.BottomLabel>{data.label}</S.BottomLabel>
                </S.Bar>
              </S.BarColumn>
            );
          })}
        </S.BarContainer>

        {/* 2. 하단 책 등(Spine) - 이미지 회전 적용 */}
        <S.BookSpine>
          <S.SpineImage src={BookCover1} alt="책 옆면" />
        </S.BookSpine>

      </S.GraphWrapper>
    </S.Container>
  );
}

export default BookmarkGraph;