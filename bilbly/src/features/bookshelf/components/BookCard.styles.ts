import styled from "styled-components";

export const Card = styled.div<{ clickable: boolean }>`
    position: relative;
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;

export const Cover = styled.img`
    width: 100%;
    border-radius: 2px;
    border: 1px solid var(--Stroke-primary, #100F0F);
`;

export const MemberCircleWrapper = styled.div`
    position: absolute;
    right: -10px;  
    bottom: -6px; 
    z-index: 2;
    width: 24px;
`;
