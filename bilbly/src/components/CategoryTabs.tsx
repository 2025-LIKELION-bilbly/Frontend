import React from 'react';
import * as S from './CategoryTabs.styles';

function CategoryTabs() {
  // 이미지에 보이는 색상들 (대략적인 값)
  const categories = [
    { label: '강', color: '#FADBD8' }, // 옅은 빨강
    { label: '강', color: '#FEF9E7' }, // 옅은 노랑
    { label: '강', color: '#EBF5FB' }, // 옅은 파랑
    { label: '강', color: '#E8F8F5' }, // 옅은 초록
  ];

  return (
    <S.Container>
      {categories.map((cat, index) => (
        <S.TabItem key={index}>
          <S.Circle color={cat.color} />
          <S.Label>{cat.label}</S.Label>
        </S.TabItem>
      ))}
    </S.Container>
  );
}
export default CategoryTabs;