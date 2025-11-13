// bilbly/src/components/Header.tsx

import React from 'react';
import * as S from './Header.styles'; // 방금 만든 스타일 파일을 'S'라는 이름으로 가져옴

function Header() {
  return (
    <S.HeaderContainer>
      <S.Logo>Bib_ly</S.Logo>
      <S.MenuButton>☰</S.MenuButton>
    </S.HeaderContainer>
  );
}

export default Header;