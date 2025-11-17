// src/components/Header.styles.ts

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: auto;
  height: 61px;
  margin: 0;
  padding: 8px 20px; /* 부모 패딩 고려해서 좌우 4px (총 20px) */
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const MenuButton = styled.button`
  font-size: 24px;
  font-weight: 400;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;