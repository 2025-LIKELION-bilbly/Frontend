export interface HighlightRange {
    highlightId: string;
    memberId: number;
    page: number;
    startOffset: number;
    endOffset: number;
}

/**
 * 겹침 조건:
 * A.start <= B.end && A.end >= B.start
 */
export const isOverlapping = (
    aStart: number,
    aEnd: number,
    bStart: number,
    bEnd: number
    ) => {
    return aStart <= bEnd && aEnd >= bStart;
    };

    /**
     * 현재 드래그 영역과 겹치는 "모든 하이라이트" 반환
     */
    export const findOverlappingHighlights = (
    page: number,
    startOffset: number,
    endOffset: number,
    highlights: HighlightRange[]
    ): HighlightRange[] => {
    return highlights.filter((h) => {
        if (h.page !== page) return false;

        return isOverlapping(
        startOffset,
        endOffset,
        h.startOffset,
        h.endOffset
        );
    });
};
