import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90px;
`;

export const Cover = styled.img`
    display: flex;
    width: 89px;
    height: 132px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 89/132;

    border-radius: var(--border-radius-sm, 2px);
    border: 1px solid var(--Stroke-primary, #100F0F);
`;

/* 디폴트 카드 */
export const DefaultCard = styled.div`
    display: flex;
    width: 89px;
    height: 132px;
    padding: 42px 12.5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 89/132;

    border-radius: var(--border-radius-sm, 2px);
    border: 1px solid var(--Stroke-primary, #100F0F);
    background: var(--bg-pattern, url(<path-to-image>) lightgray 0% 0% / 50px 50px repeat, #FFFCF8);
    background-blend-mode: multiply, normal;
`;

export const Nickname = styled.div`
    color: var(--text-primary, #100F0F);
    text-align: center;

    margin-top: 5px;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 150% */
    letter-spacing: -0.5px;
`;
