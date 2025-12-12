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
    pointer-events: none;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #100F0F; 
`;
export const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  flex: 1; 
  width: 100%;
`;

export const BookDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  text-align: left; 
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 40px;
`;

export const BookTitlePlaceholder = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #100F0F;
  margin: 36px 0 28px 0;
  line-height: 1.3;
  width: 100%;
  text-align: center; 
`;


export const BookMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  width: 100%;
  gap: 8px; 
  margin-bottom: 28px; 
  padding-left: 4px;
`;

// 한 줄 (예: 저자   작가이름)
export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; 
`;

export const MetaLabel = styled.span`
  font-size: 14px;
  font-weight: 400; 
  color: #909090;
`;

export const MetaValue = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #100F0F;
`;


export const BookSummaryPlaceholder = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #100F0F;
  line-height: 1.6;
  margin: 0 0 36px 0;
  word-break: keep-all;
  white-space: pre-wrap;
  width: 100%;
  text-align: left; 
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 0 0 8px 0; 
  text-align: left;
  width: 100%;
  padding: 5px 0;
`;
export const ReviewTable = styled.div`
  width: 100%;
  display: flex;
  align-items: center; 
  border: none;
  border-bottom: 1px solid #100F0F; 
  background-color: transparent; 
  padding: 12px 12px; 
  box-sizing: border-box;
  gap: 24px;
`;

/* 1. 리뷰 내용 (왼쪽) */
export const ReviewContentCell = styled.div`
  flex: 1; 
  font-size: 14px;
  color: #100F0F;
  line-height: 1.4;
  word-break: keep-all;
  text-align: left;
  padding: 0;
  font-weight: 400;
`;

/* 2. 가운데 뜬 구분선 */
export const VerticalLine = styled.div`
  width: 1px;
  height: 24px; 
  background-color: #100F0F;
`;

/* 3. 모임.. (오른쪽) */
export const ReviewInfoCell = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #100F0F;
  white-space: nowrap; 
  padding: 0;
`;