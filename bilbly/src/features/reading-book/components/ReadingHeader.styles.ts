import styled from "styled-components";
import ArrowLeftIcon from "@/assets/arrow-left.svg?react";


export const HeaderBox = styled.div`
    position: absolute;     
    top: 0;
    left: 0;

    width: 100%;
    max-width: 393px;

    height: 45px;
    padding: 0 16px;

    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 100;

    border-bottom: 1px solid var(--Basic-black, #100F0F);
`;



export const Title = styled.div`
    flex: 1;
    font-size: 17px;
    font-weight: 600;
`;

export const BookmarkButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;s
    cursor: pointer;
`;

export const BookmarkToast = styled.div`
    position: absolute;
    top: 52px;
    right: 16px;

    padding: 10px 14px;
    border-radius: 16px;

    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    font-size: 13px;
    color: #333;
    z-index: 100;
`;

export const LeftIcon = styled(ArrowLeftIcon)`
    width: 7.5px;
    height: 15px;
    flex-shrink: 0;
`;