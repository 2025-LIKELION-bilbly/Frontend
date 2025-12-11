import styled from "styled-components";
import HighlightSvg from "@/assets/highlight.svg?react";
import CommentSvg from "@/assets/comment.svg?react";
import MemoSvg from "@/assets/memo.svg?react";

export const Container = styled.div`
    position: absolute;
    transform: translate(-50%, -120%);

    background: #141414;
    padding: 8px 16px;
    border-radius: 28px;

    display: flex;
    gap: 20px;
    z-index: 200;
`;

export const Highlight = styled(HighlightSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;

    &:hover {
        opacity: 0.8;
    }
`;

export const Comment = styled(CommentSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;

    &:hover {
        opacity: 0.8;
    }
`;

export const Memo = styled(MemoSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;

    &:hover {
        opacity: 0.8;
    }
`;


