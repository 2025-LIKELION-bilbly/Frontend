import { createAnnotation } from "./annotation.controller";
import { openCommentOverlay } from "../ui/comment.overlay";
import { createMemoFromQuote } from "./memo.controller";

const COMMENT_LIMIT = 25;

export function createComment(root: HTMLElement) {
  const quote = createAnnotation(root, { type: "quote" });
  if (!quote) return;

  openCommentOverlay({
    annotationId: quote.id,
    onInput: value => {
      if (value.length > COMMENT_LIMIT) {
        createMemoFromQuote(root, quote, value);
      }
    },
    onSave: value => {
      quote.content = value;
    },
    onCancel: () => {},
  });
}
