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