import styled from "styled-components";
import CheckSvg from "@/assets/check.svg?react";
import XSvg from "@/assets/x.svg?react";

export const Box = styled.div<{
    $bgColor: string;
    $selected: boolean;
    $disabled: boolean;
}>`
    width: 80px;
    height: 45px;
    padding: 12px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: ${({ $bgColor }) => $bgColor};
`;



export const Label = styled.div<{ $color: string }>`
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;

    color: ${({ $color }) => $color};
`;

export const CheckIcon = styled(CheckSvg)<{ $color: string }>`
    width: 20px;
    height: 20px;
    stroke: ${({ $color }) => $color};
`;

export const UncheckIcon = styled(XSvg)<{ $color: string }>`
    width: 20px;
    height: 20px;
    stroke: ${({ $color }) => $color};
`;
