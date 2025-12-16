import { createAnnotation, deleteAnnotation } from "./annotation.controller";
import type { Annotation } from "../annotation/annotation.core";
import { openMemoPopup } from "../ui/memo.popup";

export function createMemoFromQuote(
  root: HTMLElement,
  quote: Annotation,
  content: string
) {
  deleteAnnotation(root, quote.id);

  const memo = createAnnotation(root, {
    type: "memo",
    page: quote.page, 
    groupId: quote.groupId,
    content,
  });

  if (!memo) return;

  openMemoPopup({
    annotationId: memo.id,
    initialContent: content,
    onSave: v => (memo.content = v),
    onDelete: () => deleteAnnotation(root, memo.id),
  });
}
