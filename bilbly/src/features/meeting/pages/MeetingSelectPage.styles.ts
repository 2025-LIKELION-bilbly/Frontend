import styled from "styled-components";
import BackgroundPattern from '../../../assets/background_pattern.png'; 

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


export const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`;
