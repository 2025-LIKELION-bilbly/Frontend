// utils/controllers/annotation.controller.ts

import type { Annotation } from "../annotation/annotation.core";
import {
  createAnnotationFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";

let annotations: Annotation[] = [];

/* ===============================
 * Annotation 생성 (highlight / quote 전용)
 * =============================== */
export function createAnnotation(
  root: HTMLElement,
  params: {
    type: "highlight" | "quote";
    color?: string;
    content?: string;
    groupId?: string;
  }
): Annotation | null {
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

  // 🔥 항상 전체 재렌더 (memo는 관여 안 함)
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
 * 조회
 * =============================== */
export function getAnnotations() {
  return annotations;
}
