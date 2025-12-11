import styled from 'styled-components';
import backgroundPattern from '../assets/background_pattern.png';


export const BottomBackground = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 393px; 
  margin: 0 auto; 
  
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
  width: 215px;
  height: 61px;
  
  background-color: #100F0F;
  border-radius: 30.5px;
  
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  padding: 0 10px;
`;

export const NavItem = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: ${props => props.$isActive ? 1 : 0.5}; 

  &:hover {
    opacity: 1;
  }
`;