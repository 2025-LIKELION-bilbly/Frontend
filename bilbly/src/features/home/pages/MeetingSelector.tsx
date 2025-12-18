// src/components/MeetingSelector.tsx
import React from 'react';
import * as S from './MeetingSelector.styles';

interface MeetingSelectorProps {
  groupName?: string; // 모임 이름을 받을 수 있게 추가
}

function MeetingSelector({ groupName }: MeetingSelectorProps) {
  return (
    <S.Container>
      <S.ArrowButton></S.ArrowButton>
      <S.MeetingName>
        {/* 데이터가 있으면 모임 이름을, 없으면 로딩 메시지를 보여줍니다 */}
        {groupName || "가입된 모임이 없습니다"}
      </S.MeetingName>
      <S.ArrowButton></S.ArrowButton>
    </S.Container>
  );
}

export default MeetingSelector;