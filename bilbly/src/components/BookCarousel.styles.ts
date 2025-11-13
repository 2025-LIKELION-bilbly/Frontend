import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 0;
  border-top: 1px solid #000; /* 섹션 구분을 위한 회색 선 */
`;

// 실제 이미지가 없으므로, 이미지 자리임을 표시하는 div
export const PlaceholderPoster = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #aaa;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 1px dashed #ccc;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DaysLeft = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #d9534f; /* 붉은색 */
`;

export const DateRange = styled.span`
  font-size: 16px;
  color: #888;
`;