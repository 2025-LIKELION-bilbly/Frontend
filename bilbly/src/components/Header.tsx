// src/components/Header.tsx

import React from 'react';
import * as S from './Header.styles';

function Header() {
  return (
    <S.HeaderContainer>
      <S.Logo>Bib_ly</S.Logo>
      <S.MenuButton>☰</S.MenuButton>
    </S.HeaderContainer>
  );
}

export default Header;