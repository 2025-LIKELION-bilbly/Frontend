import React from 'react';
import * as S from './BookCarousel.styles';

function BookCarousel() {
  return (
    <S.Container>
      {/* 나중에 이미지가 생기면 <S.PosterImage src={...} />로 교체 */}
      <S.PlaceholderPoster>
        <span>(책 포스터 이미지 자리)</span>
      </S.PlaceholderPoster>

      <S.InfoContainer>
        <S.DaysLeft>30일 남음</S.DaysLeft>
        <S.DateRange>~25.10.31</S.DateRange>
      </S.InfoContainer>
    </S.Container>
  );
}
export default BookCarousel;