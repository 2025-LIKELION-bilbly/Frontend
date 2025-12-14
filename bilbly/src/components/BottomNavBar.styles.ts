import styled from 'styled-components';
import backgroundPattern from '../assets/background_pattern.png';

export const BottomBackground = styled.div`
  position: fixed;
  bottom: 0;
  
  /* 화면 정중앙 강제 정렬 */
  left: 50%;
  transform: translateX(-50%);
  
  width: 100%;
  max-width: 393px; 
  
  height: auto;
  padding: 16px 0;
  background-color: #FFFCF8;
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 1000;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${backgroundPattern});
    background-repeat: repeat;
    opacity: 0.1; 
    mix-blend-mode: multiply;
    z-index: -1;
    pointer-events: none;
  }
`;

export const NavPill = styled.nav`
  width: fit-content; 
  height: 61px;
  
  background-color: #100F0F;
  border-radius: 30.5px;
  
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 24px; 
  
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 8px 16px; 
  box-sizing: border-box; 
`;

export const NavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  /* 아이콘 배경 원 크기 */
  width: 45px;
  height: 45px;
  border-radius: 50%;

  /* [색상 로직] 
     활성화(true) -> 배경: 흰색(#FFFCF8), 아이콘: 검은색(#100F0F)
     비활성(false) -> 배경: 투명, 아이콘: 흰색(#FFFCF8) 
  */
  background-color: ${props => props.$isActive ? '#FFFCF8' : 'transparent'};
  color: ${props => props.$isActive ? '#100F0F' : '#FFFCF8'};
  
  /* 비활성일 때 살짝 흐리게 */
  opacity: ${props => props.$isActive ? 1 : 0.5};

  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;