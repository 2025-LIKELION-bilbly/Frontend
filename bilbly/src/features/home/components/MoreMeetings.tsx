import React from 'react';
import * as S from './MoreMeetings.styles';

function MoreMeetings() {
  return (
    <S.Container>
      <S.Header>
        <S.Title>흔적 모아보기</S.Title>
        <S.ViewMoreLink>더보기 &gt;</S.ViewMoreLink>
      </S.Header>
      <S.CardContainer>
        {/* 임시 카드 */}
        <S.Card>카드 1</S.Card>
        <S.Card>카드 2</S.Card>
        <S.Card>카드 3</S.Card>
      </S.CardContainer>
    </S.Container>
  );
}
export default MoreMeetings;