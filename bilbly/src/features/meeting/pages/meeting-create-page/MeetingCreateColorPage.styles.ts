import styled from "styled-components";
import BackgroundPattern from "../../../../assets/background_pattern.png";

// 페이지 전체 컨테이너
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
    }
`;

// 버튼 제외 영역
export const MainContainer = styled.div`
    display: flex;
    // max-width: 300px;
    padding-top: 60px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 44px;
    margin: 0 49.3px; 
`;

export const MainBox1 = styled.div`
    display: flex;
    height: 171px;
    flex-direction: column;
    align-items: center; 
`;


export const StepText = styled.div`
    text-align: center;
    color: #100f0f;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; /* 150% */
    margin-bottom: 24px;
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


// 색상 그리드
export const ColorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    justify-items: center;
`;

// 버튼 영역
export const BottomArea = styled.div`
    margin-top: auto;
    width: 100%;
    padding-bottom: 24px;
`;
