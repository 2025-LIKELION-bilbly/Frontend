import styled from "styled-components";
import BackgroundPattern from "../../../.././assets/background_pattern.png";  // ➡️ 경로 이동
import ConfettiSvg from "@/assets/confetti.svg?react";

export const Container = styled.div`
    width: 100%;
    max-width: 393px;
    margin: 0 auto;
    background-color: #FFFCF8;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 16px;
    position: relative;
    z-index: 0;

    &::before {
        content: "";
        position: absolute; /* 이 Container(480px) 내부에 고정 */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        
        /* 5. 피그마 속성 적용 */
        background-image: url(${BackgroundPattern});
        background-repeat: repeat;  /* Scale: Tile */
        opacity: 0.1;               /* Opacity: 10% */
        mix-blend-mode: multiply;   /* Blend: Multiply */
        
        z-index: -1; /* 패턴을 이 컨테이너의 맨 뒤로 보냄 */
    }
`;

// btn 제외 container
export const MainContainer = styled.div`
  display: flex;
  width: 220px;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;


export const MainBox1 = styled.div`
    display: flex;
    height: 135px;
    flex-direction: column;
    align-items: center;
`; 

export const MainBox2 = styled.div`
  display: flex;
  width: 192px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const Confetti = styled(ConfettiSvg)`
  width: 30px;
  height: 30px;
  aspect-ratio: 1/1;
  margin-bottom: 24px;
`;


export const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: #100f0f;
  text-align: center;
  margin-bottom: 12px;
`;

export const Subtitle = styled.div`
  font-size: 16px;
  text-align: center;
  color: #5a5959;
  line-height: 22px;
`;

// 🗓️ 코드 생성한 날짜 +7일로 변경할 예정
export const DateText = styled.div`
  margin-top: 73px;  // MainBox1 아래에서 간격 맞춤
  margin-bottom: 12px;
  font-size: 18px;
  color: #8b8683;
`;




// 코드 복사 버튼
export const CopyButton = styled.button`
  width: 192px;
  margin-top: 24px;
  padding: 12px;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--border-radius-sm, 2px);
  border: 1px solid var(--Stroke-primary, #100F0F);
`;


export const BottomArea = styled.div`
    width: 100%;
    display: flex;  
    margin-top: auto;
    padding-bottom: 24px;
`;


export const InviteCode = styled.div`
  margin: 16px 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 6px;
  color: #100f0f;
  z-index: 1;
`;
