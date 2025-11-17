// bilbly/src/components/BookmarkGraph.tsx

import React from 'react';
import * as S from './BookmarkGraph.styles';

// 이미지에서 보이는 데이터 (막대 안 숫자, X축 라벨)
const barData = [
  { category: '서', height: 15 },
  { category: '어', height: 25 },
  { category: '머', height: 48 },
  { category: '어', height: 51 },
  { category: '는', height: 69 },
  { category: '해', height: 85 },
];

function BookmarkGraph() {
  return (
    <S.Container>
      <S.Title>나의 북마크 (%)</S.Title>

      <S.ChartContainer>
        {barData.map((bar, index) => (
          <S.BarWrapper key={index}>
            <S.Bar height={bar.height}>
              {bar.height}
            </S.Bar>
            <S.CategoryLabel>{bar.category}</S.CategoryLabel>
          </S.BarWrapper>
        ))}
      </S.ChartContainer>
    </S.Container>
  );
}
export default BookmarkGraph;