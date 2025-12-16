import styled from "styled-components";

export const Button = styled.button`
    width: 100%;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    border: none;
    border-radius: 22px;

    background-color: #111;
    color: #fff;

    font-size: 14px;
    font-weight: 600;

    cursor: pointer;

    &:hover {
        background-color: #222;
    }

    &:active {
        transform: scale(0.98);
  }
`;

export const Icon = styled.span`
    font-size: 16px;
    line-height: 1;
`;
