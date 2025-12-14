// src/types/highlight.ts

export interface HighlightItem {
    highlightId: number;
    page: number;
    text: string;
    startOffset: number;
    endOffset: number;
    color: string;
    memberId: number;
    commentCount: number;
    memoCount: number;
}

export interface CreateHighlightPayload {
    page: number;
    text: string;
    startOffset: number;
    endOffset: number;
    color: string;
}
