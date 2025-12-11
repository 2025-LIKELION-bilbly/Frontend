// src/features/home/pages/HomePage.styles.ts

import styled from 'styled-components';

import BackgroundPattern from '../../../assets/background_pattern.png'; 

export const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  background-color: #FFFCF8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 16px; 
  padding-bottom: 117px;
  position: relative;
  z-index: 0;
  
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
  }
`;