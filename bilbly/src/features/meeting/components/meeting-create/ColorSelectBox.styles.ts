import styled from "styled-components";
import CheckSvg from "@/assets/check.svg?react";
import XSvg from "@/assets/x.svg?react";

export const Box = styled.div<{
    $bgColor: string;
    $selected: boolean;
}>`
    width: 80px;    // Step4ColorPage의 MainContainer 너비에 맞춤
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 12px 8px;
    cursor: pointer;

    background-color: ${({ $bgColor }) => $bgColor};

    transition: 0.2s ease;
`;


// 색상 박스 글자 
export const Label = styled.div<{ $color: string }>`
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 150% */

    color: ${({ $color }) => $color};
`;



export const CheckIcon = styled(CheckSvg)<{ $color: string }>`
    width: 16px;
    height: 16px;
    stroke: ${({ $color }) => $color};
`;

export const UncheckIcon = styled(XSvg)<{ $color: string }>`
    width: 18px;
    height: 18px;
    stroke: ${({ $color }) => $color};
`;
