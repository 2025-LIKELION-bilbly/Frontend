import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around; /* 4개 아이템을 균등하게 배치 */
  padding: 16px 0;
`;

export const TabItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* 동그라미와 '강' 글자 사이 간격 */
  cursor: pointer;
`;

export const Circle = styled.div<{ color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;