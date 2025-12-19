import styled from "styled-components";
import * as G from "../styles/GlobalStyle";

export const Circle = styled.div<{
    $bgColor: keyof typeof G.theme.colors;
    $textColor: string;
    $size: number;
    $fontSize: number;
}>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;
    background: ${({ $bgColor }) => G.theme.colors[$bgColor]};
    color: ${({ $textColor }) => $textColor};
    display: flex;

    justify-content: center;
    align-items: center;
    font-family: Pretendard;
    font-size: ${({ $fontSize }) => $fontSize}px;
    font-style: normal;
    font-weight: 500;
    line-height: 1; 
`;
