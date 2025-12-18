import styled from "styled-components";
import HighlightSvg from "@/assets/highlight.svg?react";
import CommentSvg from "@/assets/comment.svg?react";
import MemoSvg from "@/assets/memo.svg?react";

/* ---------------- 기본 버튼 ---------------- */

const BaseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
`;

/* ---------------- 컨테이너 ---------------- */

export const Container = styled.div`
    position: absolute;
    transform: translate(-50%, -120%);
    background: #141414;
    padding: 8px 16px;
    border-radius: 28px;
    display: flex;
    gap: 16px;
    align-items: center;
    z-index: 200;
`;

/* ---------------- 아이콘 공통 ---------------- */

const IconBase = styled(BaseButton)`
    width: 20px;
    height: 20px;
    color: white;
    opacity: 1;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        opacity: 0.35;
        cursor: default;
    }

    & > svg {
        width: 20px;
        height: 20px;
    }
`;

/* ---------------- 액션 버튼 ---------------- */

export const Highlight = styled(IconBase).attrs({ as: HighlightSvg })``;

export const Comment = styled(IconBase).attrs({ as: CommentSvg })``;

export const Memo = styled(IconBase).attrs({ as: MemoSvg })``;

/* ---------------- 삭제 ---------------- */

export const DeleteButton = styled(BaseButton)`
    background-color: #ff4d4f;
    color: white;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: bold;

    &:hover {
        background-color: #cc0000;
    }
`;

export const Separator = styled.div`
    width: 1px;
    height: 16px;
    background: #555;
`;
