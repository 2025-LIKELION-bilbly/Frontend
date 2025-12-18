import styled, { keyframes } from 'styled-components'; // keyframes 꼭 필요!
import BackgroundPattern from '../../../assets/background_pattern.png';

// ----------------------------------------------------------------
// 1. 전체 컨테이너 및 배경
// ----------------------------------------------------------------
export const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  background-color: #FFFCF8;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  
  padding: 0 19px 16px 19px;
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

// ----------------------------------------------------------------
// 2. 헤더 (뒤로가기 + 타이틀)
// ----------------------------------------------------------------
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 56px; 
  /* 컨테이너 패딩 무시하고 꽉 채우기 위한 설정 */
  width: calc(100% + 38px);
  margin-left: -19px;
  margin-right: -19px;
  padding: 0 16px;
  box-sizing: border-box;
  
  gap: 4px;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 0;
  text-align: left;
  line-height: 30px;
`;



export const BookSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0; 
`;

export const LargeBookImage = styled.img`
  width: 178px;  
  height: 264px; 
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #100F0F;
`;

export const BookTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const BookTitle = styled.h3`
  font-size: 24px; 
  font-weight: 600;
  color: #100F0F;
  margin: 36px 0 24px 0;
  line-height: 36px;
`;

export const InfoGrid = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px; 
  margin-bottom: 28px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 12px;
  color: #595959;
  font-weight: 400;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: #100F0F;
  font-weight: 500;
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  text-align: left; 
  gap: 8px;
`;

export const DetailText = styled.p`
  font-size: 14px;
  color: #909090; 
  margin: 0;
  line-height: 21px;
`;

export const DetailValue = styled.span`
  color: #100F0F;
  margin-left: 8px;
`;

export const SummarySection = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 100px;
`;

export const SummaryText = styled.p`
  font-size: 14px;
  color: #100F0F;
  line-height: 21px;
  white-space: pre-wrap;
  margin: 28px 0 24px 0;
`;

// ----------------------------------------------------------------
// 4. 하단 버튼 영역
// ----------------------------------------------------------------
export const BottomButtonArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 393px;
  margin: 0 auto;
  padding: 16px;
  
  /* 배경색 및 패턴 적용 */
  background-color: #FFFCF8; 
  z-index: 20;
  overflow: hidden;

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

// 🔥 isTaken prop을 받아서 색상 변경
export const SelectButton = styled.button<{ $isTaken?: boolean }>`
  /* 피그마 코드 적용 */
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  width: 100%;

  /* 추가 스타일 */
  height: 45px; /* 높이 고정 */
  
  /* 이미 선택된 책이면 회색(#CCC), 아니면 주황색(#FF7932) */
  background-color: ${props => props.$isTaken ? '#CCC' : '#FF7932'};
  
  /* 이미 선택된 책이면 회색글자(#7A7A7A), 아니면 흰색(#FFF) */
  color: ${props => props.$isTaken ? '#7A7A7A' : '#FFF'};
  
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 2px; 
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// ----------------------------------------------------------------
// 5. 토스트 메시지 (이게 없어서 에러났을 확률 99%)
// ----------------------------------------------------------------
const slideUp = keyframes`
  from { transform: translate(-50%, 100%); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 80px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  display: flex;
  width: 360px;
  padding: 12px 16px;
  align-items: center;
  gap: 24px;

  background-color: #FFFFFF; 
  border: 1px solid #100F0F; 
  border-radius: 2px; 

  animation: ${slideUp} 0.3s ease-out;
`;

export const ToastIconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ToastTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ToastTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #100F0F;
  line-height: 24px;
`;

export const ToastSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #100F0F;
  letter-spacing: -0.5px;
`;