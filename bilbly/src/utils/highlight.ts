// utils/highlight.ts
export const applyHighlight = (color: string) => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return null;

    const range = selection.getRangeAt(0);

    const selectedText = selection.toString();
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    // <span>으로 감싸기
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    span.style.borderRadius = "3px";
    span.style.padding = "2px 0";

    range.surroundContents(span);

    return {
        textSentence: selectedText,
        startOffset,
        endOffset,
        color,
    };
};
