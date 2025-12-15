// utils/controllers/annotation.controller.ts

import type { Annotation } from "../annotation/annotation.core";
import {
  createAnnotationFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";
import type { AnnotationType } from "../annotation/annotation.core";

let annotations: Annotation[] = [];

/* ===============================
 * 내부 유틸: annotation 중첩 방지
 * =============================== */
function isInsideAnnotation(range: Range): boolean {
  const node =
    range.startContainer.nodeType === Node.ELEMENT_NODE
      ? (range.startContainer as HTMLElement)
      : range.startContainer.parentElement;

  if (!node) return false;

  // 🔥 memo / highlight / quote 전부 중첩 금지
  return Boolean(node.closest(".annotation"));
}

/* ===============================
 * Annotation 생성
 * =============================== */
export function createAnnotation(
  root: HTMLElement,
  params: {
    type: "highlight" | "quote" | "memo";
    color?: string;
    content?: string;
    groupId?: string;
  }
): Annotation | null {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);

  /* 🔥 핵심 방어 로직 */
  if (isInsideAnnotation(range)) {
    console.warn(
      "[createAnnotation] 이미 annotation 내부입니다. 생성 중단"
    );
    return null;
  }

  const result = getTextRangeFromSelection(root);
  if (!result) return null;

  const annotation = createAnnotationFromSelection({
    type: params.type,
    text: result.text,
    range: result.range,
    color: params.color,
    content: params.content,
  });

  if (params.groupId) {
    annotation.groupId = params.groupId;
  }

  annotations = addAnnotation(annotations, annotation);

  renderAnnotations(root, annotations);

  return annotation;
}

/* ===============================
 * Annotation 삭제
 * =============================== */
export function deleteAnnotation(root: HTMLElement, id: string) {
  annotations = removeAnnotationById(annotations, id);
  renderAnnotations(root, annotations);
}

/* ===============================
 * Annotation 조회
 * =============================== */
export function getAnnotations() {
  return annotations;
}

/* ===============================
 * Comment anchor 해결
 * =============================== */
export function resolveCommentAnchor(
  container: HTMLElement,
  activeAnnotation?: { id: string; type: AnnotationType }
): { anchorId: string; created: boolean } | null {
  // 1️⃣ 이미 하이라이트 선택된 경우 → 재사용
  if (activeAnnotation?.type === "highlight") {
    return {
      anchorId: activeAnnotation.id,
      created: false,
    };
  }

  // 2️⃣ selection이 memo 내부인지 검사
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const node =
    range.startContainer.nodeType === Node.ELEMENT_NODE
      ? (range.startContainer as HTMLElement)
      : range.startContainer.parentElement;

  if (node?.closest(".annotation.memo")) {
    console.warn(
      "[resolveCommentAnchor] memo 내부에서는 comment 생성 불가"
    );
    return null;
  }

  // 3️⃣ 새 하이라이트 생성
  const highlight = createAnnotation(container, {
    type: "highlight",
  });

  if (!highlight) return null;

  return {
    anchorId: highlight.id,
    created: true,
  };
}
