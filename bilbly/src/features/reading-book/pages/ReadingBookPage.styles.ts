import styled from "styled-components";
import BackgroundPattern from '../../../assets/background_pattern.png';

export const Container = styled.div`
    width: 100%;
    max-width: 393px;
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


export const ContentBox = styled.div`
    padding-top: 60px;
    font-size: 16px;
    line-height: 26px;
    color: #222;
    transition: padding-top 0.25s ease;
    height: 599px;
    overflow: hidden;
`;



export const ToggleWrapper = styled.div<{ showUI: boolean }>`
    position: fixed; // 화면 아래쪽에 고정
    left: 50%;
    transform: translateX(-50%);

    /* 기본 위치: 아래쪽에 붙음 */
    bottom: ${({ showUI }) => (showUI ? "100px" : "24px")};

    transition: bottom 0.25s ease;
    z-index: 20;
`;


export const LeftClickZone = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    z-index: 10;
`;

export const CenterClickZone = styled.div`
    position: absolute;
    left: 20%;
    top: 0;
    width: 60%;
    height: 100%;
    z-index: 10;
`;

export const RightClickZone = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 100%;
    z-index: 10;
`;
