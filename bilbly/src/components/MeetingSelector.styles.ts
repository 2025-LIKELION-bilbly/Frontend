import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #000;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 0 10px;
  color: #888;
`;

export const MeetingName = styled.div`
  font-size: 18px;
  font-weight: bold;
  border: 1px solid #e0e0e0; /* 이미지의 둥근 테두리 */
  border-radius: 20px; /* 둥근 모양 */
  padding: 8px 16px;
`;