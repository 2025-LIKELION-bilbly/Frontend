import React from 'react';
import * as S from './MeetingSelector.styles';

function MeetingSelector() {
  return (
    <S.Container>
      <S.ArrowButton>&lt;</S.ArrowButton>
      <S.MeetingName>모임 이름이 들어가는 자리</S.MeetingName>
      <S.ArrowButton>&gt;</S.ArrowButton>
    </S.Container>
  );
}

export default MeetingSelector;