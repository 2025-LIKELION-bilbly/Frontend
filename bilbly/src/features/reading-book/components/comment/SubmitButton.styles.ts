import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    border: none;
    border-radius: 22px;

    background-color: #111;
    color: #fff;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:not(:disabled):hover {
        background-color: #222;
    }

    &:not(:disabled):active {
        transform: scale(0.98);
    }
`;

export const CheckIcon = styled.span`
    font-size: 14px;
    line-height: 1;
`;
