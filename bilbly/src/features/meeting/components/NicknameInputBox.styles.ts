import styled from "styled-components"; 

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    align-self: stretch;
`;



export const InputField = styled.input<{ $isInvalid: boolean }>`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-bottom: 1.5px solid
        ${({ $isInvalid }) => ($isInvalid ? "#ED264E" : "#909090")};
    background-color: transparent;
    outline: none;

    &::placeholder {
    text-align: left;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 150% */
    letter-spacing: -0.5px;
        color: ${({ $isInvalid }) => ($isInvalid ? "#FFB3B3" : "#909090")};
    }
`;

export const Desc = styled.div<{ $isInvalid: boolean }>`
    margin-top: 6px;
    padding: 0 12px;
    font-size: 12px;
    color: ${({ $isInvalid }) => ($isInvalid ? "#ED264E" : "#8b8683")};
`;