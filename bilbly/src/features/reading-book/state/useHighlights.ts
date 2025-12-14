export interface HighlightRange {
    highlightId: number;
    memberId: number;
    page: number;
    startOffset: number;
    endOffset: number;
    mode: "focus" | "together";
}
