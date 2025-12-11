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

// src/components/ToolBar.styles.ts (예시)

// 기존 S.Container, S.Highlight, S.Comment, S.Memo 스타일 정의

export const Delete = styled.button`
    /* * ⭐ 삭제 버튼 스타일 
     * 삭제 기능을 강조하기 위해 배경색을 빨간색 계열로 설정하는 것이 일반적입니다.
     */
    background-color: #ff4d4f; /* 붉은색 */
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    white-space: nowrap;

    &:hover {
        background-color: #cc0000;
    }
`;

// 기존 스타일 컴포넌트들...
