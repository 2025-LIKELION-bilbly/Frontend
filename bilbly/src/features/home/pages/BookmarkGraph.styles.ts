import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 0 36px 0;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin-bottom: 24px;
  margin-top: 36px;
  font-family: Pretendard;
  
  .unit {
    font-size: 14px;
    font-weight: 500;
    color: #595959;
    margin-left: 4px;
    font-family: Pretendard;
    font-style: normal;
  }
`;

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 10px;
  margin-bottom: -12px;
  z-index: 1;
  overflow: visible;
`;

export const BarColumn = styled.div<{ $index: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  margin-left: -6px; 
  
  &:first-child {
    margin-left: 0;
  }

  position: relative;
  /* 오른쪽 북마크가 위로 오도록 순서 지정 */
  z-index: ${({ $index }) => $index ?? 0};
`;

/* ✨ 요청하신 스타일 적용 */
export const Bar = styled.div<{ height: number; color: string }>`
  display: flex;
  width: 25px;
  padding: 6px;
  justify-content: center;
  align-items: flex-start; /* 글자가 위쪽으로 정렬됨 */

  /* 높이와 색상은 데이터에 따라 동적으로 적용 */
  height: ${props => props.height}px;
  background-color: ${props => props.color};
  box-shadow: 0 4px 4px 0 rgba(81, 81, 81, 0.20);

`;

export const BottomLabel = styled.span`
  color: ${({ theme }) => theme.colors.rose800}; 
  font-family: 'GimpoBatang', serif; 
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px; /* 125% */
  letter-spacing: -1px;
`;

export const BookSpine = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 4px 4px 0 0;
  overflow: hidden; 
  position: relative; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #100F0F;
  z-index: 5;
`;

export const SpineImage = styled.img`
  position: absolute;
  top: 100%;
  left: 0;
  transform-origin: top left;
  transform: rotate(-90deg);
  width: 50px; 
  height: 361px; 
  object-fit: cover;
  object-position: right top;
`;