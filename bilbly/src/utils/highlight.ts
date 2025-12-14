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
    container,
    id,
    startOffset,
    endOffset,
    color,
    }: {
    container: HTMLElement;
    id: string;
    startOffset: number;
    endOffset: number;
    color: string;
    }) => {
    const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
    );

    let currentOffset = 0;
    let startNode: Text | null = null;
    let endNode: Text | null = null;
    let startNodeOffset = 0;
    let endNodeOffset = 0;

    let node: Text | null;

    while ((node = walker.nextNode() as Text | null)) {
        const len = node.textContent?.length ?? 0;

        if (!startNode && currentOffset + len >= startOffset) {
        startNode = node;
        startNodeOffset = startOffset - currentOffset;
        }

        if (!endNode && currentOffset + len >= endOffset) {
        endNode = node;
        endNodeOffset = endOffset - currentOffset;
        break;
        }

        currentOffset += len;
    }

    if (!startNode || !endNode) return;

    const range = document.createRange();
    range.setStart(startNode, startNodeOffset);
    range.setEnd(endNode, endNodeOffset);

    const span = document.createElement("span");
    span.className = "annotation highlight";
    span.dataset.id = id;
    span.dataset.type = "highlight";
    span.style.backgroundColor = color;
    span.style.borderRadius = "3px";
    span.style.padding = "2px 0";

    range.surroundContents(span);
};
