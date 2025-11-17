import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 0;
  border-top: 1px solid #000;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

export const ViewMoreLink = styled.a`
  font-size: 14px;
  color: #888;
  text-decoration: none;
  cursor: pointer;
`;

export const CardContainer = styled.div`
   display: flex;
   gap: 16px;
   overflow-x: auto; /* 카드 많아지면 좌우 스크롤 */
`;

export const Card = styled.div`
   width: 150px;
   height: 150px;
   border-radius: 8px;
   background-color: #f0f0f0;
   border: 1px dashed #ccc;
   display: flex;
   align-items: center;
   justify-content: center;
   color: #aaa;
   flex-shrink: 0; /* 스크롤될 때 찌그러지지 않게 */
`;