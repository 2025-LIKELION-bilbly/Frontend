// bilbly/src/components/BookmarkGraph.styles.ts

import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 0;
  border-top: 1px solid #000;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 24px 0;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-end; /* 막대가 아래에서부터 자라도록 */
  height: 180px; /* 그래프 전체 높이 */
  padding: 0 10px;
  border-bottom: 2px solid #333; /* X축 선 */
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 40px;
`;

export const Bar = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}%; /* 높이를 %로 받음 */
  max-height: 170px; /* 최대 높이 */
  background: linear-gradient(to bottom, #d9534f, #c9302c); /* 붉은색 계열 */
  border-radius: 4px 4px 0 0; /* 윗부분만 둥글게 */

  /* 막대 안의 숫자 */
  display: flex;
  justify-content: center;
  padding-top: 8px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  box-sizing: border-box;
`;

export const CategoryLabel = styled.span`
  font-size: 14px;
  color: #333;
`;