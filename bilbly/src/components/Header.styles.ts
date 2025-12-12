import styled from 'styled-components';
import BackgroundPattern from '../assets/background_pattern.png'; 

export const HeaderContainer = styled.header`
  /* 1. 상단 고정 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000; 

  width: 100%;
  max-width: 393px;
  margin: 0 auto;  
  height: 61px;
  

  background-color: #FFFCF8; 
  
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    background-image: url(${BackgroundPattern});
    background-repeat: repeat;
    opacity: 0.1; 
    mix-blend-mode: multiply; 
    
    z-index: -1; 
    pointer-events: none;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const MenuButton = styled.button`
  font-size: 24px;
  font-weight: 400;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;