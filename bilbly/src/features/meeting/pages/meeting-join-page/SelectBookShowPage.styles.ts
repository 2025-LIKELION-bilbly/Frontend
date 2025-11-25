import styled from "styled-components";
import BackgroundPattern from "../../../.././assets/background_pattern.png";
import ConfettiSvg from "@/assets/confetti.svg?react";

export const Container = styled.div`
    width: 100%;
    max-width: 393px;
    margin: 0 auto;
    height: 100vh;             /* 전체 화면 고정 */
    background-color: #FFFCF8;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    position: relative;
    z-index: 0;
    overflow: hidden;          /* 전체 페이지 스크롤 방지 */

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

export const MainBox1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
`; 
export const Confetti = styled(ConfettiSvg)`
    width: 30px;
    height: 30px;
    aspect-ratio: 1/1;
    margin-bottom: 24px;
`;

export const Title = styled.div`
    color: var(--text-primary, #100F0F);
    text-align: center;

    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; 
`;

export const Subtitle = styled.div`
    color: var(--text-primary, #100F0F);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`;

export const SectionTitle = styled.h2`
    color: #000;
    text-align: center;

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
`;

/* 책 Grid만 스크롤되도록 감싸는 래퍼 */
export const BookScrollArea = styled.div`
    height: 360px;                 /* 남은 공간을 모두 차지 */
    overflow-y: auto;   

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;  /* IE, Edge */
    scrollbar-width: none;     /* Firefox */

`;

/* 3열 고정 Grid 레이아웃 */
export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, max-content));
    justify-content: center;
    gap: 20px 20px;
    width: 100%;
`;



export const BottomArea = styled.div`
    width: 100%;
    display: flex;  
    margin-top: auto;
    padding-bottom: 24px;
`;
