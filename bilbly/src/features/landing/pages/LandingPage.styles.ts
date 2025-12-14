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
  padding-top: 61px;
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

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #100F0F; 
`;

export const BookImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  padding: 36px 0;
  width: 100%;
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
  line-height: 24px;
`;

export const Nickname = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #100F0F; 
  text-align: center;
`;

export const BottomSection = styled.div`
  width: 100%;
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 0;
  line-height: 30px; /* 두 줄 텍스트 간격 조정 */
`;

export const ActionBtn = styled.button<{ $isLast?: boolean }>`
  width: 100%;
  padding: 12px;
  height: 48px;
  border: 1px solid #100F0F;
  border-radius: 4px;
  

  margin-top: 20px;
  margin-bottom: ${props => props.$isLast ? '24px' : '0'};
 
  background-color: #FFFCF8; 
  position: relative;
  overflow: hidden;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #100F0F;
  cursor: pointer;
  line-height: 21px;
  
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
    pointer-events: none;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  &:hover {
    opacity: 0.9;
  }
`;
// 책 안골랐을 때 
export const BottomSubTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #595959; 
  margin: 4px 0 0 0;
  line-height: 21px;
`;