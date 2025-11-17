import styled from "styled-components";
import BackgroundPattern from '../../../../assets/background_pattern.png';

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
    width: 300px;
    padding-top: 60px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 60px;
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
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    align-self: stretch;
`;

export const StepText = styled.div`
    text-align: center;
    color: #100f0f;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 150% */
    margin-bottom: 12px;
`;

export const Title = styled.div`
    text-align: center;
    color: #100f0f;
    margin-bottom: 12px;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 150% */
`;

export const SubTitle = styled.div`
    color: #100F0F;
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`;




export const BottomArea = styled.div`
    margin-top: auto;
    width: 100%;
    padding-bottom: 24px;
`;
