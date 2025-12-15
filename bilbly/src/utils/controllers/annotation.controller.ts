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
    page: number; // ✅ 추가
  }
): Annotation | null {
  const result = getTextRangeFromSelection(root);
  if (!result) return null;

  const annotation = createAnnotationFromSelection({
    type: params.type,
    text: result.text,
    range: result.range,
    page: params.page, 
    color: params.color,
    content: params.content,
  });

  annotation.page = params.page;
  if (params.groupId) {
    annotation.groupId = params.groupId;
  }

  annotations = addAnnotation(annotations, annotation);

  // ✅ highlight만 재렌더
  if (annotation.type === "highlight") {
    renderAnnotations(root, annotations);
}

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
