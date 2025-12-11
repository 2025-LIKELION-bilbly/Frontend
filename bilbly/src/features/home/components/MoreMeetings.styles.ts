import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0; 
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const ViewMoreLink = styled.a`
  font-size: 14px;
  color: #595959;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
`;

export const CardContainer = styled.div`
   display: flex;
   width: 100%;
   margin: 0 auto;
   justify-content: space-between;
   flex-wrap: wrap; 
   align-items: center;
   padding: 0 16px; 
   box-sizing: border-box; 
   overflow: visible;
   margin-bottom: 20px;
   gap: 20px 0;
`;

export const Card = styled.div`
   flex-basis: calc((100% - 24px) / 3);
   height: 160px;
   border: 1px solid #100F0F;
   display: flex;
   flex-direction: column;
   align-items: center;    
   justify-content: flex-start;
   gap: 12px;
   padding: 12px 12px 10px 12px;
   transition: transform 0.3s ease;
   flex-shrink: 0; 
`;

// 상단 원
export const CircleIcon = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$color || '#D9D9D9'};
  flex-shrink: 0;
`;

// 본문 텍스트
export const CardText = styled.p<{ $isBlurred?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  color: #100F0F;
  margin: 0;
  line-height: 21px;
  width: 100%;
  height: 62px;
  text-align: center; /* 텍스트 가운데 정렬 */
  
`;

// 하단 정보 컨테이너 (세로 정렬로 변경)
export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; /* 세로 정렬 중요! */
  align-items: center;
  justify-content: center;
  margin-top: auto; 
`;

// 구분선
export const Divider = styled.div`
  width: 100%; 
  border-top: 0.5px solid #909090;
  margin-bottom: 4px; 
`;

// 하단 텍스트 스타일
export const FooterText = styled.span`
  font-size: 12px;
  color: #595959;
  font-weight: 400;
  text-align: right;
  width: 100%;
`;