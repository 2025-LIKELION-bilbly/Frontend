// bilbly/src/components/MeetingSelector.styles.ts

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0 0 0; 
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 9px;

  /* 👇 SVG 아이콘으로 대체 */
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  background-position: center;
  
  /* 👇 주신 SVG 코드를 배경 이미지로 설정 (오른쪽 화살표) */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'><path d='M9 4.5L16.5 12L9 19.5' stroke='%23100F0F' stroke-linecap='round' stroke-linejoin='round'/></svg>");

  /* 👇 Container의 첫 번째 ArrowButton(왼쪽 화살표)만 180도 회전 */
  &:first-of-type {
    transform: rotate(180deg);
  }
`;

// 👇 "팔각형 테두리"를 SVG 배경이미지로 구현
export const MeetingName = styled.div`
  width: 300px;
  height: 44px;
  background-color: transparent; 
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='44' viewBox='0 0 300 44' fill='none'><path d='M287.712 0.5L299.5 13.085V30.9141L287.712 43.5H12.2881L0.5 30.9141V13.085L12.2881 0.5H287.712Z' stroke='%23100F0F'/></svg>");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;


  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  font-style: normal;
  color: #100F0F;
  font-family: 'GimpoBatang';
  line-height: 36px;
  letter-spacing: 3px;
  

  border: none; 
  padding: 0;
  box-sizing: border-box;
`;
