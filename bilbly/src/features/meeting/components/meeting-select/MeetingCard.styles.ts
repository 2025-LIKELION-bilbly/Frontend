import styled from "styled-components";
import ArrowRightIcon from "@/assets/arrow-right.svg?react";


// 전체 카드 컨테이너
export const CardContainer = styled.div`
    display: flex;
    padding: 16px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: var(--border-radius-md, 4px);
    border: 1px solid var(--Stroke-primary, #100F0F);
`;

// 텍스트 컨테이너
export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`;

// 공통 텍스트 스타일
const BaseTitle = styled.div`
    color: var(--text-primary, #100F0F);
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    line-height: 150%;
`;

export const Title = styled(BaseTitle)`
    font-size: 16px;
    font-weight: 600;
`;

export const Description = styled(BaseTitle)`
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.5px;
    text-align: left;
`;


// 오른쪽 화살표 아이콘 스타일
export const RightIcon = styled(ArrowRightIcon)`
    width: 7.5px;
    height: 15px;
    flex-shrink: 0;
`;
