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
`;



export const Container = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: auto;
`;

export const LeftButton = styled.button`
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    background-color: transparent;
    border-radius: var(--border-radius-sm, 2px);
    border: 1px solid var(--Stroke-primary, #100F0F);
    cursor: pointer;

    &:active {
        opacity: 0.8;
    }


    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 150% */
    letter-spacing: -0.5px;
`;

export const RightButton = styled.button`
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    border-radius: var(--border-radius-sm, 2px);
    background: var(--bg-accent, #FF7932);
    color: var(--text-primary-ondark, #FFFCF8);
    border:none;
    
    :active {
        opacity: 0.85;
    }

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 150% */
    letter-spacing: -0.5px;
`;
