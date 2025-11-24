// CodeInput.styles.ts
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 16px;
    width: 192px;
    height: 56px;
`;

// 숫자 입력 한 칸을 감싸는 박스
export const Box = styled.div`
    width: 40px;
    padding: 10px;
    border-bottom: 1px solid var(--Stroke-primary, #100F0F);
    text-align: center;
    gap: 10px;
    justify-content: center;
    lign-items: center;
`;


// 숫자 입력 한 칸
export const Input = styled.input`
    width: 100%;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px;
    border: none;
    background: transparent;

    &:focus {
        outline: none;
    } 
`;


export const ReadOnlyDigit = styled.span`
    color: var(--text-primary, #100F0F);
    text-align: center;

    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 36px; ;
`;
