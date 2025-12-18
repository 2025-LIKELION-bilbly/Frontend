// utils/memo.ts
import { createAnnotation } from "../utils/controllers/annotation.controller";

/**
 * ✅ 메모 생성
 * - DOM 조작 ❌
 * - popup ❌
 * - annotation만 생성
 */
export const applyMemo = (
  root: HTMLElement,
  page: number
) => {
  const selection = window.getSelection();
  if (!selection || !selection.toString().trim()) return null;

  const annotation = createAnnotation(root, {
    type: "memo",
    page,
  });

  // selection 정리
  selection.removeAllRanges();

  return annotation;
};
