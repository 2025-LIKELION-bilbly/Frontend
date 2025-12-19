import React from 'react';
import * as S from './CategoryTabs.styles';

// 부모(HomePage)로부터 받을 데이터 타입 정의
interface CategoryTabsProps {
  members?: string[]; // 닉네임 배열
}

// 색상 배열 (닉네임 순서대로 순환하며 적용됨)
const TAB_COLORS = [
  { bgColor: '#F6C5CF', textColor: '#970522' },
  { bgColor: '#F2F4C6', textColor: '#888F00' },
  { bgColor: '#D7E9F7', textColor: '#1E3A5F' },
  { bgColor: '#E6E6FA', textColor: '#4B0082' },
];

function CategoryTabs({ members = [] }: CategoryTabsProps) {
  // 만약 서버 데이터가 아직 없다면 로딩 상태나 빈 화면 표시
  if (!members || members.length === 0) {
    return (
      <S.Container>
        <div style={{ padding: '10px', color: '#ccc', fontSize: '12px' }}>
          멤버 정보를 불러오는 중...
        </div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {members.map((nickname, index) => {
        // 색상을 순서대로 배정 (4개가 넘어가면 다시 첫 번째 색상 사용)
        const color = TAB_COLORS[index % TAB_COLORS.length];
        
        return (
          <S.TabItem key={index}>
            <S.Circle $bgColor={color.bgColor} $textColor={color.textColor}>
              {/* 닉네임의 첫 글자만 표시 (예: "고권혜" -> "고") */}
              {nickname ? nickname.charAt(0) : '?'}
            </S.Circle>
            {/* 필요하다면 원 아래에 전체 닉네임을 텍스트로 추가할 수 있습니다 */}
          </S.TabItem>
        );
      })}
    </S.Container>
  );
}

export default CategoryTabs;