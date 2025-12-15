import type { TextRange } from "./annotation.core";

export function getTextRangeFromSelection(
  root: HTMLElement
): { range: TextRange; text: string } | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  if (range.collapsed) return null;

  if (
    !root.contains(range.startContainer) ||
    !root.contains(range.endContainer)
  ) {
    return null;
  }

  const text = selection.toString();
  if (!text.trim()) return null;

  const start = getOffset(root, range.startContainer, range.startOffset);
  const end = getOffset(root, range.endContainer, range.endOffset);

  if (start === null || end === null || end <= start) return null;

  return { range: { start, end }, text };
}

function getOffset(
  root: HTMLElement,
  node: Node,
  offset: number
): number | null {
  let count = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let current: Node | null = walker.nextNode();
  while (current) {
    if (current === node) return count + offset;
    count += current.textContent?.length ?? 0;
    current = walker.nextNode();
  }
  return null;
}
