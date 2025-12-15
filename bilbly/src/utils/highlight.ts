// utils/highlight.ts

import { surroundSelection, removeAnnotation } from "./annotation.core";
import type { AnnotationResult } from "./annotation.core";
/**
 * 형광펜을 적용합니다.
 */
export const applyHighlight = (color: string): AnnotationResult | null => {
    const style: React.CSSProperties = {
        backgroundColor: color,
        borderRadius: "3px",
        padding: "2px 0",
    };
    return surroundSelection('highlight', style);
};

export const removeHighlight = (highlightId: string): void => {
    removeAnnotation(highlightId);
}; 

export const restoreHighlight = ({
    id,
    startOffset,
    endOffset,
    color,
    container,
    }: {
    id: string;
    startOffset: number;
    endOffset: number;
    color: string;
    container: HTMLElement;
    }) => {
    if (!container) return;

    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
    );

    let currentOffset = 0;
    let node: Text | null = null;

    while ((node = walker.nextNode() as Text | null)) {
        const nodeLength = node.textContent?.length ?? 0;
        const nodeStart = currentOffset;
        const nodeEnd = currentOffset + nodeLength;

        // 이 노드가 하이라이트 범위와 겹치면
        if (nodeEnd > startOffset && nodeStart < endOffset) {
        const range = document.createRange();

        const start = Math.max(0, startOffset - nodeStart);
        const end = Math.min(nodeLength, endOffset - nodeStart);

        range.setStart(node, start);
        range.setEnd(node, end);

        const span = document.createElement("span");
        span.className = "annotation highlight";
        span.dataset.id = id;
        span.dataset.type = "highlight";
        span.style.backgroundColor = color;
        span.style.borderRadius = "3px";
        span.style.padding = "2px 0";

        range.extractContents();
        range.insertNode(span);
        }

        currentOffset += nodeLength;
    }
};

