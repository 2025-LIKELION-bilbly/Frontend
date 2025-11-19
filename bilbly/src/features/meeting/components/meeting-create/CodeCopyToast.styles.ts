import styled from "styled-components";
import CheckSvg from "@/assets/check.svg?react";


export const ToastContainer = styled.div`
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    animation: toastSlide 2.2s ease-in-out forwards;

    @keyframes toastSlide {
        0% {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        15% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, 30px);
        }
    }
`;


export const ToastBox = styled.div`
    background: #FFFCF8;
    border-radius: 2px;
    padding: 12px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
    width: 361px;
    border: 1px solid var(--Stroke-primary, #100F0F)
`;

export const CheckIcon= styled(CheckSvg)`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    stroke: #100F0F;
`;

export const Message = styled.div`
    color: var(--text-primary, #100F0F);

    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */
`;

export const SubMessage = styled.div`
    margin-top: 4px;
    font-size: 14px;
    color: #666;
`;

// message + submessage 묶음 s
export const MessageBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
`;