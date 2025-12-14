import styled from 'styled-components';
import BackgroundPattern from '../../../assets/background_pattern.png';

export const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  background-color: #FFFCF8;
  display: flex;
  flex-direction: column;
  align-items: center; 
  min-height: 100vh;
  
  padding: 0 16px;
  padding-bottom: 16px; 
  
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

export const TopSection = styled.div`
  margin-top: 114px; 
  text-align: center;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 0 0 12px 0;
  line-height: 30px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #100F0F;
  line-height: 18px;
  margin: 0;
`;

export const BookInfoSection = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;
  gap: 12px;
  
  width: 100%;
  margin-top: 48px; 
`;

export const BookImage = styled.img`
  width: 89px;
  height: 132px;
  object-fit: cover;
  border: 1px solid #100F0F;
  border-radius: 2px;
`;

export const BookTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  gap: 4px;
`;

export const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #100F0F;
  margin: 0;
  line-height: 24px;
`;

export const BookAuthor = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #595959;
`;

export const InputSection = styled.div`
  width: 100%;
  margin-top: 48px; 
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

export const ReviewInput = styled.input<{ $isError?: boolean }>`
  width: 300px;
  padding: 12px; 
  height: 45px;
  border: none; 
  
  border-bottom: 1px solid ${props => props.$isError ? '#ED264E' : '#909090'};
  
  border-radius: 0; 
  background-color: transparent;
  
  font-size: 14px;
  font-weight: 400;
  color: #909090;
  box-sizing: border-box;

  &::placeholder {
    color: #909090;
    transition: color 0.2s ease; 
  }
  
  &:focus::placeholder {
    color: transparent;
  }
  
  &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.$isError ? '#ED264E' : '#909090'};
  }
`;


export const HelperText = styled.p<{ $isError?: boolean; $show?: boolean }>`
  width: 300px; 
  text-align: left;
  padding: 0 12px; 
  box-sizing: border-box;

  font-size: 12px;
  font-weight: 400;
  
  color: ${props => props.$isError ? '#ED264E' : '#909090'};
  
  margin: 6px 0 0 0;
  line-height: 18px;
  
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
`;

// disabled 상태일 때 회색으로 변경
export const NextButton = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 2px;
  
  /* 비활성화(disabled) 상태일 때와 아닐 때 색상 구분 */
  background-color: ${props => props.disabled ? '#CCCCCC' : '#FF7932'};
  color: ${props => props.disabled ? '#7A7A7A' : '#FFFFFF'};
  
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  

  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  
  margin-top: auto; 


  &:hover {
    opacity: ${props => props.disabled ? '1' : '0.9'};
  }
`;