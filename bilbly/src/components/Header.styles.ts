// bilbly/src/components/Header.styles.ts

import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 8px 20px;
  height: 61px;
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 정렬 */
  align-items: center;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const MenuButton = styled.button`
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;