import styled from "styled-components";
import CheckSvg from "@/assets/check.svg?react";
import XSvg from "@/assets/x.svg?react";

export const Box = styled.div<{
    $bgColor: string;
    $selected: boolean;
}>`
    width: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ $bgColor }) => $bgColor};

    border: ${({ $selected }) =>
        $selected ? "2px solid #8A3131" : "2px solid transparent"};

    transition: 0.2s ease;
`;

export const CheckIcon = styled(CheckSvg)`
    width: 16px;
    height: 16px;
`;

export const UncheckIcon = styled(XSvg)`
    width: 18px;
    height: 18px;
`;
