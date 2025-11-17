// src/features/home/components/BookCarousel.styles.ts

import styled from 'styled-components';

export const Container = styled.div`
  padding: 48px 0 36px 0;
  border-top: 1px solid #000;
`;

export const ScrollContainer = styled.div`
  display: flex;
  
  /* 👇 [수정] 책들을 수직 방향 '가운데'로 정렬 (살짝 올라오는 효과) */
  align-items: center; 
  
  gap: 24px;
  padding: 0 calc(50% - 89px); 
  margin-bottom: 0;
  
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const BookItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  width: 178px;
  flex-direction: column;
  align-items: center;
  gap: 0;
  
  flex-shrink: 0;
  scroll-snap-align: center;

  transition: transform 0.3s ease, opacity 0.3s ease;
  
  /* 👇 [수정] 크기가 변할 때 '중앙'을 기준으로 변하게 설정 */
  transform-origin: center center;
  
  /* 활성 상태면 1배, 아니면 0.8배 축소 */
  transform: ${props => props.$isActive ? 'scale(1)' : 'scale(0.8)'};
  opacity: ${props => props.$isActive ? 1 : 0.5};
`;

export const CoverWrapper = styled.div<{ $isActive?: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  
  /* 보더 1px 유지 */
  border: 1px solid #DBDBDB;
  box-sizing: border-box;
  
  /* 👇 [수정] 쉐도우 효과 삭제 */
  /* box-shadow: ... ; (삭제됨) */
  /* transition: box-shadow 0.3s ease; (삭제됨) */
`;

export const BookCoverImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

export const Overlay = styled.div`
  display: none;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
`;

export const UserIcon = styled.div<{ $bgColor: string; $textColor: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.$bgColor};
  color: ${props => props.$textColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
`;

export const UserTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #100F0F;
`;

export const UserStatus = styled.span`
  font-size: 12px;
  color: #999999;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
  padding: 0; 
  margin-top: 8px; 
  box-sizing: border-box;
`;

export const DaysLeft = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #FF5C00;
`;

export const DateRange = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #999999;
`;

export const ProgressBarTrack = styled.div`
  display: flex;
  width: 100%;  
  height: 4px;   
  flex-direction: column;
  align-items: flex-start;
  background-color: #E0E0E0;
  border-radius: 2px;
  margin-top: 16px; 
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  width: ${props => props.percent}%;
  height: 100%;
  background-color: #FF5C00;
`;

export const HiddenInfo = styled.div<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  transition: opacity 0.3s ease;
  
  opacity: ${props => props.$isActive ? 1 : 0};
  
  /* 정보가 안 보일 때는 클릭 안 되게 */
  pointer-events: ${props => props.$isActive ? 'auto' : 'none'};
`;