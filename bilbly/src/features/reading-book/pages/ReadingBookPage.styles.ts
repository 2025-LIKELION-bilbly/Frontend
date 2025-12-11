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
    user-select: text;

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


export const ContentBox = styled.div`
    padding-top: 60px;     
    padding-bottom: 100px; 
    font-size: 16px;
    line-height: 26px;
    color: #222;

    height: 599px;         
    overflow: hidden;
    position: relative;
    z-index: 1;

    user-select: text;
`;




export const TextWrapper = styled.div`
    min-height: 100%;
    display: block;
    user-select: text;
`;




export const ToggleWrapper = styled.div<{ $showUI: boolean }>`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ $showUI }) => ($showUI ? "100px" : "24px")};
    transition: bottom 0.25s ease;
    z-index: 20;
`;



