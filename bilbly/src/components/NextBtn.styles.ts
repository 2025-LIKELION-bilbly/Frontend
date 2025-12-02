import styled from "styled-components";

export const ButtonWrapper = styled.button<{ $state: "default" | "valid" | "invalid" }>`
    width: 100%;
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: var(--border-radius-sm, 2px);

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.5px;

    border: none;

    /* 기본, able, disable 상태별 배경색 */
    background-color: ${({ $state }) => {
        switch ($state) {
        case "valid":
            return "#FF7932"; 
        case "invalid":
            return "#CCC"; 
        default:
            return "#FFFFFF"; 
        }
    }};




    /* 기본, able, disable 상태별 글자색 */
    color: ${({ $state }) => {
        switch ($state) {
        case "valid":
            return "#FFFCF8"; 
        case "invalid":
            return "#7A7A7A"; 
        default:
            return "#100F0F"; 
        }
    }};

    /* 상태별 클릭 가능 여부 */
    cursor: ${({ $state }) => ($state === "valid" ? "pointer" : "default")};
    pointer-events: ${({ $state }) => ($state === "valid" ? "auto" : "none")};
    transition: 0.2s ease-in-out;
`;
