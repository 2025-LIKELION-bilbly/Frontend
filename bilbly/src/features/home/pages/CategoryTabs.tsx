import React from 'react';
import * as S from './CategoryTabs.styles';


const colorMap: { [key: string]: { bg: string; text: string } } = {
  RED: { bg: '#F6C5CF', text: '#970522' },
  YELLOW: { bg: '#F2F4C6', text: '#888F00' },
  BLUE: { bg: '#C5DDF3', text: '#074D8F' },
  GREEN: { bg: '#CDF1CD', text: '#347333' },
};

interface Member {
  groupId: number;
  nickname: string;
  color: string; // "RED", "YELLOW" 등
}

interface CategoryTabsProps {
  members: Member[];
}

function CategoryTabs({ members }: CategoryTabsProps) {
  return (
    <S.Container>
      {members.length > 0 ? (
        members.map((member) => {
          // 서버에서 온 색상 값이 colorMap에 없으면 기본값 적용
          const themeColor = colorMap[member.color] || colorMap['RED'];
          
          return (
            <S.TabItem key={member.groupId}>
              <S.Circle $bgColor={themeColor.bg} $textColor={themeColor.text}>
                {/* 닉네임의 첫 글자만 따서 표시 (예: "강강강강") */}
                {member.nickname.charAt(0)}
              </S.Circle>
            </S.TabItem>
          );
        })
      ) : (
        /* 데이터가 없을 때 표시할 빈 원들 혹은 placeholder */
        <div style={{ color: '#ccc', fontSize: '12px' }}>멤버 없음</div>
      )}
    </S.Container>
  );
}

export default CategoryTabs;