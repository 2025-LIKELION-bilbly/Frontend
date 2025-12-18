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

//모임원이 많으면 다음 줄로 넘어가게 flex-wrap 추가
export const BookGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  margin-top: 80px;
  flex-wrap: wrap; /* 이 부분이 핵심입니다! */
`;

export const BookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  /* 여러 줄이 될 때를 대비해 약간의 마진 추가 */
  margin-bottom: 16px; 
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

export const HomeButton = styled.button`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  width: 100%;

  /* Style */
  border-radius: 2px; /* var(--border-radius-sm, 2px) */
  background: #FF7932; /* var(--bg-accent, #FF7932) */
  border: none;
  
  /* Text Style (추가) */
  color: #FFFFFF;
  font-size: 16px; /* 버튼 크기에 맞춰 적절히 조정 */
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;