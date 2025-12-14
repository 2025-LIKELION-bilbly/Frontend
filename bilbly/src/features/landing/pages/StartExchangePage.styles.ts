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
  padding-top: 0;
  padding-bottom: 0; 
  
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
    pointer-events: none;
  }
`;

export const TitleSection = styled.div`
  margin-top: 114px; 
  text-align: center;
`;

export const MainTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 0 0 12px 0 ;
  line-height: 30px;
  white-space: pre-wrap;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #100F0F;
  line-height: 24px;
  margin: 0;
  white-space: pre-wrap;
`;

export const BookGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  margin-top: 80px; 
`;

export const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const BookImage = styled.img`
  width: 89px;
  height: 132px;
  object-fit: cover;
  border: 1px solid #100F0F;
  border-radius: 2px;
`;

export const BookPlaceholder = styled.div`
  width: 89px;
  height: 132px;
  border: 1px solid #100F0F;
  border-radius: 2px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #100F0F;
  word-break: keep-all;
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 1.4;
`;

export const Nickname = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #100F0F;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: auto; 
  margin-bottom: 16px;
  
`;

export const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  height: 45px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  cursor: pointer;
  padding: 12px;
  background-color: ${props => props.$primary ? '#FF7932' : '#FFFCF8'};
  color: ${props => props.$primary ? '#FFFFFF' : '#100F0F'};
  border: ${props => props.$primary ? 'none' : '1px solid #100F0F'};

  &:hover {
    opacity: 0.9;
  }
`;