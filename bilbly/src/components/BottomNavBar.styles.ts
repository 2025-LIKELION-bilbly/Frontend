import styled from 'styled-components';

export const BottomBackground = styled.div`
  position: fixed;
  bottom: 30px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  
  /* width: auto; -> NavPill의 고정 너비를 따르도록 auto나 fit-content 유지 */
  width: auto; 
  display: flex;
  justify-content: center;
`;

export const NavPill = styled.div`
  /* ✅ 피그마 코드 반영 */
  display: flex;
  
  /* 너비 215px 고정 */
  width: 215px; 
  
  /* 패딩: 상하 8px, 좌우 16px */
  padding: 8px 16px; 
  
  /* 내부 아이템 정렬 및 간격 */
  justify-content: center;
  align-items: center;
  gap: 24px; /* 아이템 사이 간격 24px */

  /* 스타일: 배경 검정, 둥근 모서리 */
  background: #100F0F; 
  border-radius: 100px; 
  
  /* 그림자 */
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  
  /* 패딩과 테두리를 너비에 포함 (안전장치) */
  box-sizing: border-box;
`;

export const NavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 아이콘 터치 영역 크기 (44x44) */
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* 선택된 아이콘 스타일: 흰색 배경 원 */
  ${props => props.$isActive && `
    background: #FFFFFF; 
    border-radius: 50%;
  `}

  &:hover {
    opacity: 0.9;
  }
  
  /* SVG 아이콘 크기 */
  img, svg {
    display: block;
    width: 24px;  
    height: 24px;
  }
`;