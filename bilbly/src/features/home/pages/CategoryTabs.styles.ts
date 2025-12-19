// src/features/home/components/CategoryTabs.styles.ts

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 24px 0;
  gap: 8px;
 
`;

export const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const Circle = styled.div<{ $bgColor: string; $textColor: string }>`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  
  background-color: ${props => props.$bgColor};
  color: ${props => props.$textColor};

  font-weight: 400;
  font-size: 12px;
  font-family: "Pretendard Variable", Pretendard, sans-serif;
`;