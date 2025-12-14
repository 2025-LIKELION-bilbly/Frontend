

import React from 'react';
import * as S from './CategoryTabs.styles';


const categories = [
  { label: '강', bgColor: '#F6C5CF', textColor: '#970522' }, // 분홍
  { label: '강', bgColor: '#F2F4C6', textColor: '#888F00' }, // 노랑(라임)
  { label: '강', bgColor: '#C5DDF3', textColor: '#074D8F' }, // 파랑
  { label: '강', bgColor: '#CDF1CD', textColor: '#347333' }, // 초록
];

function CategoryTabs() {
  return (
    <S.Container>
      {categories.map((cat, index) => (
        <S.TabItem key={index}>
          <S.Circle $bgColor={cat.bgColor} $textColor={cat.textColor}>
            {cat.label}
          </S.Circle>
        </S.TabItem>
      ))}
    </S.Container>
  );
}
export default CategoryTabs;